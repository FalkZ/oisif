import localforage from "localforage";

interface Item {
  text: string;
  done: boolean;
}
interface Data {
  date: string;
  data: Item[];
}

class Store {
  private id = "oisif-v0";
  public async load(): Promise<Item[]> {
    console.log("load");
    const i: Data = await localforage.getItem(this.id);

    if (!i) {
      let arr = this.getUrlData();

      if (arr.length === 0) arr = ["Yoga", "Other stuff", "Edit there ↘️"];
      const d = arr.map((text) => ({ text, done: false }));

      this.save(d);
      return d;
    }

    if (i.date !== this.getDate()) {
      const d = this.clearDone(i.data);

      this.save(d);

      return d;
    }

    this.save(i.data);
    return i.data;
  }

  private clearDone(data: Item[]): Item[] {
    return data.map(({ text }) => ({ text, done: false }));
  }

  private getDate() {
    const today = new Date();
    return (
      today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate()
    );
  }

  private getData(data: Item[]) {
    return {
      data,
      date: this.getDate(),
    };
  }

  private getUrlData(): string[] {
    const hash = window.location.hash.replace("#", "");
    if (!hash) return [];
    const data = decodeURIComponent(hash);

    try {
      const r = JSON.parse(data);
      if (Array.isArray(r)) return r;
    } catch (error) {
      console.error(error);
    }

    return [];
  }

  private saveToUri(data: Item[]) {
    console.log("uri");
    window.location.hash = encodeURIComponent(
      JSON.stringify(data.map(({ text }) => text))
    );
  }

  public async save(data: Item[]) {
    this.saveToUri(data);
    await localforage.setItem(this.id, this.getData(data));
  }

  public reset() {
    window.location.hash = "";
    localforage.removeItem(this.id);
  }
}

export const store = new Store();

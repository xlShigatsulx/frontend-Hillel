export class TodoAPI {
  constructor(title, description = "", completed = false) {
    this.title = title;
    this.description = description;
    this.completed = completed;
  }
  static prefix = "todos";
  static async getAll(url) {
    try {
      const resp = await fetch(`${url}/${TodoAPI.prefix}`);

      if (!resp.ok) {
        console.error("Filed to get todos fetch error.");
      }

      return await resp.json();
    } catch (e) {
      console.error(e);
      throw new Error("Filed to get todos.");
    }
  }

  static async getById(url, id) {
    try {
      const resp = await fetch(`${url}/${TodoAPI.prefix}/${id}`);

      if (!resp.ok) {
        console.error("Filed to get todo by id, fetch error.");
      }
      return await resp.json();
    } catch (e) {
      console.error(e);
      throw new Error("Filed to get todo by id.");
    }
  }

  static async save(url, data) {
    try {
      const resp = await fetch(`${url}/${TodoAPI.prefix}`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!resp.ok) {
        console.error("Filed to upload todo fetch error.");
      }
    } catch (e) {
      console.error(e);
      throw new Error("Filed to upload todos.");
    }
  }

  static async delete(url, id) {
    try {
      const resp = await fetch(`${url}/${TodoAPI.prefix}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!resp.ok) {
        console.error("Filed to delete todo, fetch error.");
      }
    } catch (e) {
      console.error(e);
      throw new Error("Filed to delete todos.");
    }
  }

  static async update(url, id, data) {
    try {
      const resp = await fetch(`${url}/${TodoAPI.prefix}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!resp.ok) {
        console.error("Filed to update todo, fetch error.");
      }
      return await resp.json();
    } catch (e) {
      console.error(e);
      throw new Error("Filed to update todos.");
    }
  }
}

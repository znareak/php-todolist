class Request {
  async send(url, data, method = "GET", isForm = false) {
    try {
      const xhr = await fetch(url, {
        method,
        body: isForm ? new FormData(data) : this.toFormData(data),
      });

      const response = await xhr.json();
      return response;
    } catch (error) {
      return error;
    }
  }

  toFormData(obj) {
    const values = Object.entries(obj);
    const formData = new FormData();
    for (const [key, value] of values) {
      formData.append(key, value);
    }
    return formData;
  }
}

class TodoList extends Request {
  async createTask(data) {
    try {
      const response = await this.send("todos.php", data, "POST", true);
      return response;
    } catch ({message}) {
      alert(message);
    }
  }

  async changeStatus(data) {
    try {
      const response = await this.send("todo-update-status.php", data, "POST");
      return response;
    } catch ({message}) {
      alert(message);
    }
  }

  async deleteTask(id){
    try {
      const response = await this.send("todos.php", {deleteId: id}, "POST");
      console.log(response);
      return response;
    } catch ({message}) {
      
    }
  }
}

export default new TodoList();

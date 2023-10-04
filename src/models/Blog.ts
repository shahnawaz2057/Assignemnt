export class Blog {
    constructor(public id: number, public userId: number, public title: string, public body: string){
     this.id = id;
     this.userId = userId;
     this.title = title;
     this.body = body;
    }
  };
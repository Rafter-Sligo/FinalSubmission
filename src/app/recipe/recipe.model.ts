export class Recipe{
    name: string;
    description: string;
    imgPath: string;
    
    constructor(name: string, desc: string, imagePath:string){
        this.name = name;
        this.description = desc;
        this.imgPath = imagePath;
    }
}
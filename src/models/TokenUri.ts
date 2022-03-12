import Attribute from "./Attribute";

export default class TokenUri {
    name: string;
    description: string;
    image: string;
    dna: number;
    edition: number;
    date: number;
    attributes: Array<Attribute>;
    compiler: string;

  constructor(
    name: string, 
    description: string, 
    image: string, 
    dna: number, 
    edition: number, 
    date: number, 
    attributes: Array<Attribute>, 
    compiler: string
) {
    this.name = name
    this.description = description
    this.image = image
    this.dna = dna
    this.edition = edition
    this.date = date
    this.attributes = attributes
    this.compiler = compiler
  }

}


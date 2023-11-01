class Key {
  constructor(private signature: number = 0) {
    this.signature = Math.random()*10;
    console.log(this.signature);
    
  }

  public getSignature = ():number => {
    return this.signature
  }
}

class Person {
  constructor(private key: Key){}

  public getKey = ():Key => {
    console.log(`Person take key: ${this.key.getSignature()}`);
    return this.key;
  }
}

abstract class House {
  constructor(
    private key: Key,
    public door: true | false = false,
    public tenants: Person[] = []
  ) { }
  
  public comeIn = (person:Person) => {

    if (this.door) {
      this.tenants.push(person);

      const last = this.tenants.length-1
      console.log(`Person with key:${this.tenants[last].getKey().getSignature()} open door in Home`);
    }
  }

  abstract openDoor(key:Key): void;
}

class MyHouse extends House {
  private myKey: Key;

  constructor(key: Key, ...args ){
    super(key, ...args)
    this.myKey = key;
  }
  
  openDoor(key: Key): void {
    if (this.myKey.getSignature() !== key.getSignature()) {
      console.log('Key wrong!');
      return
    }

    if (key.getSignature()) {
      this.door = true;
      console.log(`Key: ${key.getSignature()} open the door`);
    }
  }
}

const key = new Key();
const key2 = new Key();

const house = new MyHouse(key);
const person = new Person(key2);

house.openDoor(person.getKey());

house.comeIn(person);


export {};
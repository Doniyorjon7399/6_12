function Log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
	descriptor.value = function () {
		console.log('Method chaqirildi')
	}
}
class TestClass {
	@Log
	testMethod() {
		return 'Test natija'
	}
}
const test = new TestClass()
test.testMethod()
///////////////////////////////////////////////////////
function ReadOnly(target: any, propertyKey: string) {
	let qiymat: any
	let isSet = false
	target[`set${propertyKey}`] = function (newValue: any) {
		if (isSet) {
			console.log(
				`Xatolik: "${propertyKey}" ni qayta o'zgartirish mumkin emas!`
			)
			return
		}
		qiymat = newValue
		isSet = true
	}
	target[`get${propertyKey}`] = function () {
		return qiymat
	}
}
class User {
	@ReadOnly
	name: string = ''
	constructor(name: string) {
		this.name = name
	}
	changeName(newName: string) {
		this.name = newName
	}
}
const user = new User('Ali')
console.log(user.name) // Ali
user.changeName('Vali')
console.log(user.name)
//////////////////////////////////////////////////////
function LogMethodName(
	target: any,
	propertyKey: string,
	descriptor: PropertyDescriptor
) {
	const originalMethod = descriptor.value
	descriptor.value = function (...args: any[]) {
		console.log(propertyKey)
		return originalMethod.apply(this, args)
	}
}
class Calculator {
	@LogMethodName
	add(a: number, b: number) {
		return a + b
	}

	@LogMethodName
	subtract(a: number, b: number) {
		return a - b
	}
}
const calc = new Calculator()
calc.add(5, 3)
calc.subtract(10, 4)
//////////////////////////////////////////////////////////////
function LogClassName(constructor: Function) {
	console.log(constructor.name)
}
@LogClassName
class Product {
	constructor(public name: string, public price: number) {}
}
@LogClassName
class Order {
	items: Product[] = []

	addItem(product: Product) {
		this.items.push(product)
	}
}
const product = new Product('Laptop', 1200)
const order = new Order()

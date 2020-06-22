class Calculator {
  constructor(prevOperand, currentOperand){
    this.prevOperand = prevOperand;
    this.currentOperand = currentOperand;
  
    console.log(this);
    console.log(this.prevOperand);
    this.clear()
  }
  
  clear() {
    this.prevO = '';
    this.currentO = '';
    this.operation = undefined;
  }
  backSpace() {
    this.currentO = this.currentO.slice(0,-1);
    if(this.currentO === '') {
      this.currentO = this.prevO.slice(0, -1);
      this.prevO = '';
    }
  
  }
  compute(){
    let computation;
    const prev = parseFloat(this.prevO) 
    const current = parseFloat(this.currentO)
    if (isNaN(prev) || isNaN(current)) return
    switch (this.operation) {
      
        case '+' : 
          computation = prev + current
        break
        case '-' : 
          computation = prev - current
        break
      case '*':
        computation = prev * current
        break
      case '÷':
        computation = prev / current
        break
      default:
        return
 }   
    this.currentO = computation;
    this.operation = undefined;
    this.prevO = '';
    this.currentOperand.style.color = '#1ebe4b';
  }
  appendNumber(number){
    if (number == '.' && this.currentO.includes('.')) return
    if (this.currentO.length >= 15) return
    this.currentO += number;
    this.currentOperand.style.color = '#222';
 
 }
  chooseOperation(operator){
  
    if (this.currentO === '') {
       if(this.prevO === '') return
       if(this.prevO.match(/[\+\-\/\*]/)){
      this.prevO = this.prevO.slice(0, -1) + operator;
    }
    else{
      return
    }
    return
    }
   
    if(this.prevO !== ''){
      this.compute()
    }
     this.prevO = this.currentO + operator;
     this.currentO = '';
     this.operation = operator;
     
  }
  getDisplayNumber(number) {
    const stringNum = number.toString();
    const integer = parseFloat(stringNum.split('.')[0]);
    const decimal = stringNum.split('.')[1];
    let displayNum;
    if(isNaN(integer)){
      displayNum = '';
    }
    else {
      displayNum = integer.toLocaleString('en', { maximumFractionDigits: 0 });
    }
    if(decimal != null){
    return `${displayNum}.${decimal}`
      
    }
    else {
      return displayNum
    }
  }
  updateDisplay(){
    this.currentOperand.innerText = this.getDisplayNumber(this.currentO);
    if (this.operation != null) {
      this.prevOperand.innerText = this.prevO;
    } else {
      this.prevOperand.innerText = '';
    } 
    if (this.currentO.length >= 10) {
      this.currentOperand.style.fontSize = '2em';
      this.prevOperand.style.fontSize = '1.4em';
    }else{
      this.currentOperand.style.fontSize = '2.8em';
      this.prevOperand.style.fontSize = '1.8em';
      
    }
  }
  
}

const buttons = document.querySelectorAll('button');
const prevOperand = document.querySelector('.prevOperand');
const currentOperand = document.querySelector('.currentOperand');
const numberKey = document.querySelectorAll('[data-num');
const operatorsKey = document.querySelectorAll('[data-operator');
const allClear = document.querySelector('.clear');
const backspace = document.querySelector('.backspace');
const equal = document.querySelector('.equals');
console.log(buttons);
var calculator = new Calculator(prevOperand, currentOperand);

numberKey.forEach(btn => btn.addEventListener('click', ()=>{
  calculator.appendNumber(btn.dataset.num)
  calculator.updateDisplay()
  
  }));
  
allClear.addEventListener('click', () => {
  calculator.clear();
  calculator.updateDisplay();
})

operatorsKey.forEach(btn => btn.addEventListener('click',() => {
  calculator.chooseOperation(btn.dataset.operator);
  calculator.updateDisplay();
}))


equal.addEventListener('click', ()=>{
  calculator.compute()
  calculator.updateDisplay();
})

backspace.addEventListener('click', ()=>{
  calculator.backSpace()
  calculator.updateDisplay();
})

function ripple(evnt) {
				let x = evnt.clientX - evnt.target.offsetLeft;
				let y = evnt.clientY - evnt.target.offsetTop;
				
				let span = document.createElement('span');
				
				span.style.left = x + 'px';
				span.style.top = y + 'px';
			  this.appendChild(span);
			  
			  setTimeout(()=>{span.remove()}, 500)
			}
			
buttons.forEach(btn => btn.addEventListener('click', 	ripple));

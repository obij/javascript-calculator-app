import React, { Component } from 'react'
import Display from './components/Display'
import Keypad from './components/Keypad' 
import * as math from 'mathjs'


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      problem: '',
      answer: '0'
    }

    this.handleClick=this.handleClick.bind(this);
    this.handleEquals=this.handleEquals.bind(this);
    this.zeroAsFirstIndex= this.zeroAsFirstIndex.bind(this);
    this.replaceAt= this.replaceAt.bind(this);
  }

  //helper function that replaces a character at a specified index
  replaceAt(str, index, chr){
    if(index > str.length - 1) return str;
    return str.substring(0, index) + chr + str.substring(index + 1);
  }

  //helper function that checks if a string has "0" at its first index
  zeroAsFirstIndex(string){
    var indexLastMult= string.lastIndexOf("x");
    var indexLastAdd= string.lastIndexOf("+");
    var indexLastSub= string.lastIndexOf("-");
    var indexLastDiv= string.lastIndexOf("/");

    if(indexLastMult === -1 && indexLastAdd=== -1 && indexLastSub === -1 && indexLastDiv === -1){ // ie no operator in string
      if(string !== '' || string[0] !== "0"){
        return false;   
      }
    }else{ // string contains an operator
      var largestIndex= Math.max(indexLastMult, indexLastAdd, indexLastSub, indexLastDiv);
      var strExtract= string.slice(largestIndex + 1, string.length);
      if(strExtract[0] === "0"){
        return true; // stirng contains "0" as first substring
      }else{
        return false;
      }
    }

  }
   
  handleEquals(){
    var node1;
    var code1;
    var result;
    if(this.state.problem.indexOf("x") !== -1){
      var repl= this.state.problem.replace(/x/g, "*");
      node1= math.parse(repl);
      code1= node1.compile();
      result= code1.evaluate()
      console.log(result);

    }else{
      node1= math.parse(this.state.problem);
      code1= node1.compile();
      result= code1.evaluate()
      console.log(result);
    }
    
    this.setState({
      problem: this.state.problem + "=" + result,
      answer: result
    })
  }

  handleClick(letter){
    var newState1; 
    if(letter === "AC"){
      this.setState({
        problem: '',
        answer: '0'
      });

    }else if(letter==="0" && this.state.problem[0] === "0"){
      this.setState({
        problem: "0"
      });

    }else if(letter === "0" && this.state.problem === ''){
      //console.log(letter);
      this.setState({
         problem: "0"
      });
     
    }else if(letter === "0"){
      //console.log(letter);
      if(!this.zeroAsFirstIndex(this.state.problem)){ 
        // ie does not contain at "0" at index 0 or after the last operator
        this.setState({
          problem: this.state.problem + letter,
          answer:  this.state.answer + letter
        });
  
      }
      
    }else if(letter === "." && this.state.problem === ''){
      this.setState({
        problem: "0.",
        answer: this.state.answer + "."
      });

    }else if(letter === "."){
      if(this.state.problem.lastIndexOf("/") !== -1 || this.state.problem.lastIndexOf("x") !== -1 || this.state.problem.lastIndexOf("-") !== -1 || this.state.problem.lastIndexOf("+") !== -1 ){
        var indexLastDiv= this.state.problem.lastIndexOf("/");
        var indexLastMult= this.state.problem.lastIndexOf("x");
        var indexLastSub= this.state.problem.lastIndexOf("-");
        var indexLastAdd= this.state.problem.lastIndexOf("+");

        var largestIndex= Math.max(indexLastDiv, indexLastMult, indexLastSub, indexLastAdd);
        var strExtract= this.state.problem.slice(largestIndex +1, this.state.problem.length);

        if(strExtract.indexOf(".") === -1){
          if(strExtract === ''){
            this.setState({
              problem: this.state.problem + "0.",
              answer: "0."
            });
          }else{
            //has a string after the last operator
            this.setState({
              problem: this.state.problem + ".",
              answer: this.state.answer + "."
            });
          }
        }

      }else{
        //this.state.problem does not contain an operator
        if(this.state.problem.indexOf(".") === -1){
          this.setState({
            problem: this.state.problem + ".",
            answer: this.state.answer + "."
          });
        }
      }
      

    }else if(((letter === "+") || (letter === "/") || (letter ==="x") || (letter === "-")) && this.state.problem.indexOf("=") !== -1){
      var indexEquals= this.state.problem.indexOf("=");
      var remainder= this.state.problem.slice(indexEquals+1, this.state.problem.length);
      var operateOnNo= remainder + letter;
      this.setState({
        problem: operateOnNo,
        answer: letter
      });

    }else if((letter === "+" || letter === "*" || letter === "/") && this.state.problem[this.state.problem.length - 1] === "-" && (this.state.problem[this.state.problem.length - 2]==="+" || this.state.problem[this.state.problem.length - 2]==="x" || this.state.problem[this.state.problem.length - 2] === "/")){
      var strProblem= this.state.problem;
      var opIndex = strProblem.length - 2;
      strProblem= this.replaceAt(strProblem, opIndex, '');
      //with the above replacement, note that the index of "-" is still at the end of the new string
      var subIndex= strProblem.length - 1;
      strProblem= this.replaceAt(strProblem, subIndex, letter);
      
      this.setState({
        problem: strProblem,
        answer: letter
      });
    
    }else if((letter === "+" || letter === "x" || letter === "/") && (this.state.answer==="+" || this.state.answer==="x" || this.state.answer === "/" || this.state.answer=== "-")){
      var repString= this.state.problem;
      var lastStr= repString[repString.length-1];
      var repString2= repString.replace(lastStr, letter);
      this.setState({
        problem: repString2,
        answer: letter
      });

    }else if(letter=== "-" && this.state.answer==="-" ){
      this.setState({
        answer: letter
      });

    }else if(letter === "-" && (this.state.answer=== "x" || this.state.answer==="/" || this.state.answer==="+")){
      newState1= this.state.problem + letter;
      this.setState({
        problem: newState1,
        answer: letter
      });

    }else if(letter ==="+" || letter==="-" || letter==="/" || letter==="x"){
      newState1= this.state.problem + letter;
      this.setState({
        problem: newState1,
        answer: letter
      });

    }else if((letter==="1" || letter=== "2" || letter==="3" || letter==="4" || letter==="5" || letter==="6" || letter==="7" || letter==="8" || letter==="9") && (this.state.answer==="+" || this.state.answer==="-" || this.state.answer==="x" || this.state.answer==="/" || this.state.problem==="" )){
       this.setState({
         problem: this.state.problem + letter,
         answer: letter
       });

    }else if(letter==="1" || letter=== "2" || letter==="3" || letter==="4" || letter==="5" || letter==="6" || letter==="7" || letter==="8" || letter==="9"){
      this.setState({
        problem: this.state.problem + letter,
        answer: this.state.answer + letter
      });
    }
  }

  render() {
    return (
      <div  className= "container">
        <Display problem = {this.state.problem} answer= {this.state.answer}/>
        <Keypad handleClick = {this.handleClick} handleEquals={this.handleEquals}/>
      </div>
    )
  }
}

export default App




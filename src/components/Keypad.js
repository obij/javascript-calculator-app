import React from 'react'

const Keypad = (props) => {
    return (
        <div className= "container-fluid">
          <div className="row">
             <div className="col-md-6 col-xs-6"><button  onClick= {()=> props.handleClick("AC")} id="clear" className="btn btn-block btn-lg">AC</button></div>
             <div className="col-md-3 col-xs-3"><button  onClick= {()=> props.handleClick("/")} id="divide" className="btn btn-block  btn-lg">/</button></div>
             <div className="col-md-3 col-xs-3"><button  onClick= {()=> props.handleClick("x")} id="multiply" className="btn btn-block btn-lg">X</button></div>
          </div>
          <br></br>
          <div className="row">
            <div className="col-md-3 col-xs-3"><button   onClick= {()=> props.handleClick("7")} id= "seven" className="btn btn-block btn-lg">7</button></div>
            <div className="col-md-3 col-xs-3"><button   onClick= {()=> props.handleClick("8")} id= "eight" className="btn btn-block btn-lg">8</button></div>
            <div className="col-md-3 col-xs-3"><button   onClick= {()=> props.handleClick("9")} id= "nine" className="btn btn-block btn-lg">9</button></div>
            <div className="col-md-3 col-xs-3"><button   onClick= {()=> props.handleClick("-")} id="subtract" className="btn btn-block btn-lg">-</button></div>
          </div>

          <br></br>
          <div className="row">
            <div className="col-md-3 col-xs-3"><button   onClick= {()=> props.handleClick("4")} id= "four" className="btn btn-block btn-lg">4</button></div>
            <div className="col-md-3 col-xs-3"><button   onClick= {()=> props.handleClick("5")} id= "five" className="btn btn-block btn-lg">5</button></div>
            <div className="col-md-3 col-xs-3"><button   onClick= {()=> props.handleClick("6")} id= "six" className="btn btn-block btn-lg">6</button></div>
            <div className="col-md-3 col-xs-3"><button   onClick= {()=> props.handleClick("+")} id="add" className="btn btn-block btn-lg">+</button></div>
          </div>

          <br></br>
          <div className="row">
            <div className="col-md-3 col-xs-3"><button   onClick= {()=> props.handleClick("1")} id= "one" className="btn btn-block btn-lg">1</button></div>
            <div className="col-md-3 col-xs-3"><button   onClick= {()=> props.handleClick("2")} id= "two" className="btn btn-block btn-lg">2</button></div>
            <div className="col-md-3 col-xs-3"><button   onClick= {()=> props.handleClick("3")} id= "three" className="btn btn-block btn-lg">3</button></div>
            <div className="col-md-3 col-xs-3"><button   onClick= {props.handleEquals} id="equals" className="btn btn-block btn-lg">=</button></div>
          </div>
            
          <br></br>
          <div className="row">
            <div className="col-md-6 col-xs-6"><button onClick= {()=> props.handleClick("0")} id= "zero" className="btn btn-block btn-lg">0</button></div>
            <div className="col-md-6 col-xs-6"><button onClick= {()=> props.handleClick(".")} id= "decimal" className="btn btn-block btn-lg">.</button></div>
          </div>
        </div>
    )
}

export default Keypad

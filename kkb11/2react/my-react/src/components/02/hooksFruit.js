import React, { useState,useEffect } from "react";
import ReactDom from "react-dom"

function FavoriteFruit({fruit}){
    return (
        <div>
            你最喜爱的水果是：{fruit}
        </div>
    )
}

// 声明列表组件 
function FruitList({fruits, onSetFruit}) { 
    return ( 
        <ul>{fruits.map(f => ( 
                <li key={f} onClick={() => onSetFruit(f)}> {f} </li> ))} 
        </ul> 
    ); 
}

function FruitAdd(props) { 
    // 输入内容状态及设置内容状态的方法 
    const [pname, setPname] = useState(""); 
    // 键盘事件处理 
    const onAddFruit = e => { 
        if (e.key === "Enter") { 
            props.onAddFruit(pname); 
            setPname("");
        }
    };
    return ( 
        <div> 
            <input type="text" value={pname} onChange={e => setPname(e.target.value)} onKeyDown={onAddFruit} /> 
        </div> 
    ); 
}

export default function HooksTest() { 
    // 声明数组状态 
    const [fruits, setFruits] = useState(["香蕉", "西瓜"]); 
    const [fruit, setFruit] = useState("")

    setTimeout(() => { setFruits(['香蕉','西瓜','橘子']) }, 1000);
    
    useEffect(()=>{ setTimeout(() => { setFruits(['香蕉','西瓜']) }, 1000); },[])

    useEffect(() => { document.title = fruit; }, [fruit]);

    return ( 
        <div>
            <FavoriteFruit fruit={fruit} />
            {/*添加列表组件*/} 
            <FruitList fruits={fruits} onSetFruit={setFruit}/> 
            <FruitAdd  onAddFruit={pname => setFruits([...fruits, pname])} />
        </div> 
    )
}


ReactDom.render(<HooksTest/>, document.getElementById("root"))



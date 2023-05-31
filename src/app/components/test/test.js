import React, { useEffect, useState } from 'react';
import Styles from './test.module.css';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { Loader } from '../loader/loader';
import  {MyModal } from 'nit-modal';

export const Test=()=>{
    const [data,setData] = useState([])
    const [keyObj,setKeyOBj] = useState({})
    const [ansObj,setAnsObj] = useState({})
    const[isShowLoader,setIsShowLoader] = useState(true)
    const[modalObj,setModalObj] = useState({fnModalBtnClick:()=>{},isShowModal:false,text:'',isShowYesBtn:true,isShowCloseBtn:true}) 

    const Question=(props)=>{
        const {qno,que,opt1,opt2,opt3,opt4,_id,fn,type}=props
        const options = ['A','B','C','D']
        return (
            <Card className='mb-3'>
              <CardContent> 
                <p><b>{qno}.{que}</b></p>
                  {
                    [opt1,opt2,opt3,opt4].map((a,b)=>{
                        return <div key={b}>{type=== 'S' ? <input value={options[b]} onChange={fn} name={_id} type='radio'/> : <input value={options[b]} onChange={fn} type='checkbox' name={_id}/> }<span className='ms-2'>{a}</span></div>
                    })
                  }
               </CardContent>  
            </Card>
        )
    }

    useEffect(()=>{
      fnCallget()
    },[])

    const fnCallget= async ()=>{
      let res = await axios.get('http://localhost:2020/que/get-que')
      const {status,data:question} =res
      if(status==200){
        setIsShowLoader(false)
           let _keyObj={}
           question.forEach(({_id,ans})=>{
               _keyObj[_id] = ans
           })
           setKeyOBj(_keyObj)
        console.log(question)
        setData(question)
      }else{
        setIsShowLoader(false)
        setData([])
      }
    console.log(res)
    }

    const fnChange=(eve)=>{
        const {name,value,type,checked} = eve.target
            if(type==='checkbox'){
                let chckedvalues = ansObj[name] ? ansObj[name].split(''):[]
                 if(checked){
                     //checked value is their how add 
                     chckedvalues.push(value)
                 }else{
                     let index = chckedvalues.indexOf(value)
                    chckedvalues.splice(index,1) 
                 }
                 ansObj[name]=chckedvalues.sort().join('')
            }else{
              ansObj[name] = value
              // console.log(ansObj)
            }
    }
    const fnModalBtnClick=(opt)=>{
      //result page is open that time close 'opt' means options is close
      if(opt=='close'){
         setModalObj({...modalObj,isShowModal:false})
      }else{
        let marks=0
        Object.keys(ansObj).forEach((qno)=>{
             if(ansObj[qno]===keyObj[qno]){
              marks++
             }
        })
        setModalObj({
          ...modalObj,
          isShowModal:true,
          fnModalBtnClick:fnModalBtnClick,
          isShowYesBtn:false,
          text:`Your ${marks} marks`
     })
      }
    }

    const fnClick=()=>{
      setModalObj({
           ...modalObj,
           isShowModal:true,
           fnModalBtnClick:fnModalBtnClick,
           text:'R u sure...'
      })
        
    }

    return (
        <div className='mb-5'>
          {isShowLoader ? <Loader /> :
          <>
          {
            data.map((val,index)=>{
                return <Question qno={index+1} key={index} fn={fnChange}  {...val}  />
            })
          }
        <Button onClick={fnClick} variant="submit">Submit</Button>          
        </> 
        }
        <MyModal {...modalObj} />      
        </div>
    )
}

import FlipUpWithOcclusion, { goFlipUpWithOcclusion } from "./FlipUpWithOcclusion"
import "./FlipUpWithOcclusionMultiLines.css"
import React from "react"
function splitStringByCharacterCount(str, count) {
    // 使用正则表达式将字符串分割成指定字符数量的子字符串
    const regex = new RegExp(`.{1,${count}}`, 'g');
    return str.match(regex) || []; // 返回匹配的数组，如果没有匹配则返回空数组
}

export function goFlipUpWithOcclusionMultiLines(){
    //如果要使用这个，需要出现的时候调用这个函数
    goFlipUpWithOcclusion();
}

function FlipUpWithOcclusionMultiLines({text,cnt,containerClassName,wrapClassName,spanClassName}) {
    return (
        <div className={`fuwoml-container ${containerClassName}`} key={text}>
             {
                        splitStringByCharacterCount(text,cnt).map((str,ind)=>{
                            return (
                                <FlipUpWithOcclusion  text={str}
                                wrapClassName={wrapClassName}
                                spanClassName={spanClassName}/>
                            )
                        })
                    }
        </div>
    )
}

export default FlipUpWithOcclusionMultiLines

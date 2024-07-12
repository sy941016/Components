/*
 * @Author: shiyuan
 * @Date: 2024-07-12 13:19:57
 * @LastEditors: shiyuan
 * @LastEditTime: 2024-07-26 09:30:54
 * @Description: 
 */
import { useState, useRef } from 'react';
import { Counter } from '@/components';
import './index.less';

type Code = string | number;
const defaultCodes: Array<Code> = ['', '', '', ''];
const CODE_LENGTH = 4;

const VerifyCode = () => {
  const inputRef = useRef<any>();
  const [codes, setCodes] = useState<string>('');
  const [showCounter, setShowCounter] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  const attemptLogin = async (codes: any) => {
    try {
      setLoading(true);
    } catch {
      setLoading(false);
    }
  };

  const handleChange = (e: any) => {
    const { value } = e.target;
    // ios 自动填充二次填充bug修复
    if (codes.length === CODE_LENGTH) {
      return;
    }
    if (value.length === 4) attemptLogin(value);
    setCodes(value);
  };

  const handleFinal = () => {
    setShowCounter(false);
  };

  const renderCounter = () => {
    return showCounter ? <Counter handleFinal={handleFinal} /> : '';
  };

  const handelSendCode = async () => {
    if (!showCounter) {
      setCodes('');
      setShowCounter(true);
    }
  };

  const renderLine = (i: number, codes: string | any[]) => {
    if ((!codes.length && i === 0) || (codes[i - 1] && i === codes.length))
      return <div className="line" />;
  };

  return (
    <div className="verifyCode">
      <div className="title">输入验证码</div>
      <div className="subTitle">已发送4位验证码至 xxx</div>
      <div className="codes">
        <input
          inputMode="decimal"
          ref={inputRef}
          className="input"
          onInput={handleChange}
          value={codes}
          maxLength={4}
        />
        {defaultCodes.map((item, i: number) => {
          return (
            <div
              className="code"
              key={i}
              onClick={() => inputRef.current.focus()}
            >
              {renderLine(i, codes)}
              {codes[i] || item}
            </div>
          );
        })}
      </div>
      {loading ? (
        <div className="login">登录中</div>
      ) : (
        <div
          className={`sendCode ${!showCounter && 'sendAgain'}`}
          onClick={handelSendCode}
        >
          重新获取 {renderCounter()}
        </div>
      )}
    </div>
  );
};

export default VerifyCode;

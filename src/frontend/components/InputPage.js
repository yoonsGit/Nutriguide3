import React from 'react';
import { Typography, Form, Input,Button,message } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../css/Button.css';
import '../css/InputPage.css';
import axios from 'axios';
function InputPage() {

    const Gender = [
        { key: 1, value: "남성" },
        { key: 2, value: "여성" }
    ];
    const Exercise = [
        { key: 1, value: "유산소" },
        { key: 2, value: "팔굽혀펴기" },
        { key: 3, value: "상체운동" },
        { key: 4, value: "하체운동" },
        { key: 5, value: "윗몸일으키기" },
        { key: 6, value: "스포츠" }
    ];

    const navigate = useNavigate();
    const [genderValue, setGenderValue] = useState(1);
    const [AgeValue, setAgeValue] = useState(0);
    const [height, setHeight] = useState(0);
    const [weight, setWeight] = useState(0);
    const [exerciseTime, setExerciseTime] = useState(0);
    const [ExerciseValue, setExerciseValue] = useState(1);

    const onHeightChange = (event) => {
        setHeight(event.currentTarget.value);
    };

    const onWeightChange = (event) => {
        setWeight(event.currentTarget.value);
    };

    const onExerciseTimeChange = (event) => {
        setExerciseTime(event.currentTarget.value);
    };

    const onExerciseSelectChange = (event) => {
        setExerciseValue(event.currentTarget.value);
    };

    const onAgeChange = (event) => {
        setAgeValue(event.currentTarget.value);
    };

    const onGenderSelectChange = (event) => {
        setGenderValue(event.currentTarget.value);
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        if (AgeValue === 0 || height === 0 || weight === 0 ) {
            message.error('모든 필수 정보를 입력해주세요');
            return; // 누락된 정보가 있을 경우 이후 작업 중단
        }
            message.success(`프로필이 입력되었습니다`);
            navigate('inputMenu');
       
        
    };

    return (
        <div className='inputPage' >
            <div style={{ maxWidth: '700px', margin: 'auto', background: 'white', padding: '20px', borderRadius: '10px' }}>
                <div className='input-logo'>건강 프로필</div>
                <Form onSubmit={onSubmit}>
                    <br />
                    <br />
                    <label className='input-text'>성별</label><br />
                    <select onChange={onGenderSelectChange} value={genderValue}>
                        {Gender.map(item => (
                            <option key={item.key} value={item.key}>{item.value} </option>
                        ))}
                    </select>
                    <br />
                    <br />
                    <label className='input-text'>나이(만 나이)</label>
                    <Input
                        onChange={onAgeChange}
                        value={AgeValue}
                        type="number"
                    />
                    <br />
                    <br />
                    <label className='input-text'>키(cm)</label>
                    <Input
                        onChange={onHeightChange}
                        value={height}
                        type="number"
                    />
                    <br />
                    <br />
                    <label className='input-text'>몸무게(kg)</label>
                    <Input
                        onChange={onWeightChange}
                        value={weight}
                        type="number"
                    />
                    <br /><br />
                   
                    <br />
                   <div className='center'>
                    <Button className={`${styles.btn} }`} onClick={onSubmit}>
            제출하기
          </Button>
          </div>
                </Form>
            </div>
        </div>
    );
}

export default InputPage;
# -*- coding: utf-8 -*-
# -*- coding: euc-kr -*-
import pandas as pd
import numpy as np
import copy
import json

# 영양제, 음식 데이터셋
pill_data = pd.read_csv('Final_Pill_Standardization_Content_Dataset.csv', header=0, encoding='cp949')
food_data = pd.read_csv('MinMax_food_data.csv', header=0, index_col=0, encoding='cp949')
pill_test_data = pd.read_csv('Final_Pill_Content_Dataset.csv', header=0, encoding='cp949')
pill_data = pill_data.drop(['INDEX'], axis=1)
food_data = food_data.drop(['NAME'], axis=1)

# 어린이 전용 영양제 인덱스
child_pill_index = [2,33,40,50,63,69,85,87,89,106,129,142,143,148,161,164,
166,168,182,188,191,200,210,225,232,235,237,238,245,246,258,265,266,
269,271,274,296,304,308,315,343,348,350,353,376,383,386,394,395,397,
413,423,424,428,430,435,440,455,457,484,488,493,502,536,539,544,545,
594,604,614,617,621,624,639,647,648,649,665,678,679,684,701,712,725,
731,747,749,750,791,804,811,821,849,850,851,868,879,888,897,901,912,
921,933,937,946,962,974,999,1026,1030,1039,1040,1044,1061,1079,1086,
1095,1106,1107,1113,1118,1122,1126,1140,1144,1147,1173,1174,1176,1192,
1193,1195,1204,1212,1237,1240,1242,1245,1251,1258,1260,1266,1278,1281,
1286]

# 제외할 영양제 인덱스
except_list_index = [6,15,35,41,67,77,79,80,89,90,109,115,121,126,142,164,
202,213,237,255,259,276,277,278,285,290,298,319,324,333,336,337,339,341,
342,345,346,349,355,366,391,403,411,421,443,448,475,484,491,497,536,600,
608,627,629,632,634,636,644,647,648,649,651,655,656,660,668,689,690,701,
723,728,745,746,747,753,755,756,760,782,789,792,828,841,852,857,862,868,
869,874,879,885,886,904,916,935,946,968,974,1044,1061,1072,1073,1106,1109,
1113,1114,1115,1134,1147,1148,1153,1164,1169,1186,1188,1209,1226,1230,1231,
1240,1254,1263,1264,1266,1271,1286,1291]

# BMI 판별 메소드
def bmicalc(x):
    
    if x < 18.5:
        y = "저체중"
    elif 18.5 <= x < 23:
        y = "정상 체중"
    elif 23 <= x < 25:
        y = "과체중"
    elif 25 <= x < 35:
        y = "경도 비만"
    else:
        y = "고도 비만"
        
    return y

# 거리 계산 메소드
def distance(x, y):
    
        x = x.to_numpy()
        a = np.linalg.norm(x - y)
        
        return a

# 추천 메소드
def calc(vJson):
    
    # 키, 몸무게, 나이
    height = vJson['height']
    height = int(height)/100    
    
    weight = vJson['weight']   
    weight = int(weight)
    
    age = vJson['age']  
    age = int(age)
    
    
    dict_key = []
    dict_key += vJson['세부'].keys() # 선택한 카테고리 추출
    
    common_zero_score_list = np.array([0 for i in range(26)]) # 공통 카테고리 전용 기본 리스트 생성
    common_value_list = list(vJson['공통'].values()) # 공통 카테고리 value
    
    detail_score_list = [[] for i in range(len(dict_key))] # 세부 카테고리 점수 합산 리스트 생성
    detail_score_set = list(vJson['세부'].values()) # 세부 카테고리 선택한 질문 점수 집합
    # 선택한 세부 카테고리별 점수 리스트 합산
    for i in range(len(vJson['세부'].values())):  
        detail_zero_score_list = np.array([0 for i in range(26)])
        for j in range(len(detail_score_set[i])):
            detail_zero_score_list += detail_score_set[i][j]            
        detail_score_list[i].append(detail_zero_score_list)

    # 선택한 공통 카테고리 점수 리스트 합산
    for i in range(len(vJson['공통'].values())):       
        for j in range(len(common_value_list[i])):     
            common_zero_score_list += common_value_list[i][j]

    # 체크된 영양소 수 확인 후 연산값 저장할 리스트 (계산식 수정 예정)
    count_check_list = [[] for i in range(len(vJson['세부'].values()))]
    
    for i in range(len(vJson['세부'].values())):
        for j in range(len(detail_score_list[i])):
            count_check_list[i].append(1 * (1.4 ** np.array((detail_score_list[i][j])*2+ common_zero_score_list)))

    for i in range(len(count_check_list)):
        for j in range(len(count_check_list[0][0])):
            if count_check_list[i][0][j] > 5:
                count_check_list[i][0][j] = 5
                
    vJson.pop('공통') # vJson 공통 key, value 제거
    
    final_list = [] # 최종으로 추천할 영양제 + 음식 인덱스 리스트 
    
    # 선택한 카테고리만큼 연산
    for i in range(len(count_check_list)):
        # 각 count_check_list 확인 후 count=0인 피처 삭제
        each_count_check_list = list(count_check_list[i][0]) # count_check_list 분리
        pill_distance_list = []
        food_distance_list = []
        nutrient_list = list(pill_data) # 영양소 목록 리스트 (ex. 루테인, 비타민A, 비타민D ...)
        
        remove_list = [] # 삭제할 피처 인덱스 리스트

        # 선택된 영양소가 없을 경우 삭제할 피처 인덱스 리스트에 추가
        for a in range(len(each_count_check_list)):
            if each_count_check_list[a] == 1:
                remove_list.append(a)   
                
        remove_col_name = []      
        
        # 역순으로 리스트 삭제  
        for idx in sorted(remove_list, reverse=True):
            del each_count_check_list[idx]   
            remove_col_name.append(nutrient_list[idx])
            del nutrient_list[idx]
        
        # 피처 제거
        new_pill_train = pill_data.drop(remove_col_name, axis=1)  
        new_food_train = food_data.drop(remove_col_name, axis=1)
        check_col_name = list(new_pill_train)
        
        # 카테고리별 중요 영양소 선별
        copy_check_col_name = copy.deepcopy(check_col_name)
        copy_each_count_check_list = copy.deepcopy(each_count_check_list)
        choice_col_name = []
        for i in range(3):
            sort_copy_each_count_check_list = sorted(copy_each_count_check_list, reverse=True)
            check_index = copy_each_count_check_list.index(sort_copy_each_count_check_list[0])
            if sort_copy_each_count_check_list[0] != 0.8:
                choice_col_name.append(copy_check_col_name[check_index])
            else:
                break
            del copy_check_col_name[check_index]
            del copy_each_count_check_list[check_index]
        
        # 영양제, 음식 거리 계산
        for j in range(len(pill_data)):  
            v = distance(new_pill_train.iloc[j], each_count_check_list)
            pill_distance_list.append(v)

        for k in range(len(food_data)):
            v = distance(new_food_train.iloc[k], each_count_check_list)    
            food_distance_list.append(v)
            
        # 각 영양제 거리 중복 제거 및 정렬
        set_pill_distance_list = set(pill_distance_list)
        list_pill_distance_list = list(set_pill_distance_list)
        sort_pill_distance_list = sorted(list_pill_distance_list)

        # 각 음식 거리 중복 제거 및 정렬
        set_food_distance_list = set(food_distance_list)
        list_food_distance_list = list(set_food_distance_list)
        sort_food_distance_list = sorted(list_food_distance_list)

        total_list = [] # 각 카테고리별 추천할 영양제 + 음식 인덱스 리스트
        
        # 영양제 추천 부분
        if age > 20:
            for x in range(len(pill_distance_list)):
                testA = pill_distance_list.index(sort_pill_distance_list[x])
                if pill_test_data.loc[testA][0] not in child_pill_index and pill_test_data.loc[testA][0] not in except_list_index:
                    total_list.append(pill_test_data.loc[testA][0])
                else:
                    continue
                if len(total_list) == 3:
                    break
        else:
            for x in range(len(pill_distance_list)):
                testA = pill_distance_list.index(sort_pill_distance_list[x])
                if pill_test_data.loc[testA][0] in child_pill_index and pill_test_data.loc[testA][0] not in except_list_index:
                    total_list.append(pill_test_data.loc[testA][0])
                else:
                    continue
                if len(total_list) == 3:
                    break
                
        # 음식 추천 부분
        for y in range(3):
            total_list.append(food_distance_list.index(sort_food_distance_list[y]))
        
        # 카테고리별 중요 영양소 추가
        for k in range(len(choice_col_name)):
            total_list.append(choice_col_name[k])   
                
        final_list.append(total_list)
        
    
    # 각 카테고리의 value에 영양제 + 음식 인덱스, 중요 영양소 전달
    count = 0
    
    for i in dict_key:
        vJson['세부'][i] = final_list[count]
        count += 1
        
        
    # BMI 계산 후 딕셔너리 추가    
    BMI = weight / (height * height)
    bmi_list = []
    bmi_string = bmicalc(BMI)
    bmi_list.append(round(BMI, 2))
    bmi_list.append(bmi_string)
    vJson['세부']['BMI'] = bmi_list
    
    testString = json.dumps(vJson['세부'], ensure_ascii=False)
    
    return testString
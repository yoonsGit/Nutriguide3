import pandas as pd
import numpy as np
import json
pill_data = pd.read_csv('Final_Pill_Standardization_Content_Dataset.csv', header=0, encoding='cp949')
pill_test_data = pd.read_csv('Final_Pill_Content_Dataset.csv', header=0, encoding='cp949')
food_data = pd.read_csv('food_dataset.csv', encoding='cp949')  
daily_intake_data = pd.read_csv('연령별_일일_섭취량_데이터셋.csv', header=0, encoding='cp949')

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

# 임의로 정한 권장 섭취량 정보
recommended_intake = {
    '1인분칼로리(kcal)': 300.0, 
    '탄수화물(g)': 80, 
    '단백질(g)': 5, 
    '지방(g)': 1.0, 
    '콜레스트롤(g)': 0.0, 
    '식이섬유(g)': 0.0, 
    '나트륨(g)': 230.0,
}

sample_data = {
    'height': 175,  # 키 (cm)
    'weight': 70,   # 몸무게 (kg)
    'age': 30       # 나이
}

def bmicalc(x):
    if x < 18.5:
        y = "저체중"
    elif 18.5 <= x < 23:
        y = "정상 체중"
    elif 23 <= x < 25:
        y = "과체중"
    elif 25 <= x < 30:
        y = "경도 비만"
    else:
        y = "고도 비만"
        
    return y
 
 # 입력한 음식명에 해당하는 영양소 정보 가져오기
def get_nutrient_info(food_name):
    nutrient_info = food_data[food_data['음식명'] == food_name].iloc[:, 1:].squeeze()
    return nutrient_info.to_dict() if not nutrient_info.empty else None

def find_deficient_nutrients(diet, recommended_intake):
    deficient_nutrients = {}
    for nutrient, intake in recommended_intake.items():
        if nutrient in diet:
            diff = intake - diet[nutrient]
            if diff > 0:
                deficient_nutrients[nutrient] = diff
    return deficient_nutrients

# 거리 계산 메소드
def distance(x, y):
    x_values = x.values  # Pandas Series를 NumPy 배열로 변환
    y_values = np.array(list(y.values()) + [0.0] * (len(x_values) - len(y)))  # y_values의 길이를 x_values와 동일하게 만듦
    a = np.linalg.norm(x_values - y_values)  # NumPy 배열 간의 차이 계산
    return a


# BMI 계산 메소드
def calc(vJson):
    # 키, 몸무게, 나이
    height = vJson['height']
    height = int(height) / 100    
    weight = vJson['weight']   
    weight = int(weight)
    age = vJson['age']  
    age = int(age)
    
    # BMI 계산
    BMI = weight / (height * height)
    bmi_string = bmicalc(BMI)
    
    # BMI 정보 추가
    vJson['BMI'] = {
        'value': round(BMI, 2),
        'status': bmi_string
    }
    
    return vJson

#임의로 정한 나이
age = 25

# 영양제 추천 함수
def recommend_pills(diet, recommended_intake):
    difference = {}
    for nutrient, intake in recommended_intake.items():
        difference[nutrient] = diet.get(nutrient, 0) - intake
    
    pill_distance_list = []
    for i in range(len(pill_data)):
        pill_distance_list.append(distance(pill_data.iloc[i], difference))  # difference는 이미 사전 형태이므로 추가 변환 없이 사용
    
    recommendation = {}
    # 20세 이상인 경우 어린이용 영양제와 제외할 영양제를 필터링하여 추천
    if age > 20:
        for idx, distance_val in sorted(enumerate(pill_distance_list), key=lambda x: x[1])[:3]:
            if idx not in child_pill_index and idx not in except_list_index:
                recommendation[f'pill_{idx}'] = distance_val
    # 20세 미만인 경우 어린이용 영양제만 추천
    else:
        for idx, distance_val in sorted(enumerate(pill_distance_list), key=lambda x: x[1])[:3]:
            if idx in child_pill_index and idx not in except_list_index:
                recommendation[f'pill_{idx}'] = distance_val
    
    return recommendation


# 예시로 사용할 섭취 음식
food_name = '가지'

# 해당 음식의 영양소 정보 가져오기
intake_amount = get_nutrient_info(food_name)
print(f"\n{food_name}의 영양소 함량: {intake_amount}")

# 부족한 영양소 찾기
deficient_nutrients = find_deficient_nutrients(intake_amount, recommended_intake)

# 결과 출력
if deficient_nutrients:
    print("\n부족한 영양소:")
    for nutrient, amount in deficient_nutrients.items():
        print(f"\n{nutrient}")
else:
    print("섭취한 영양소가 모두 권장량 이상입니다.")

# 영양제 추천 실행
recommendation = recommend_pills(intake_amount, recommended_intake)
print(f"\n추천 영양제: {recommendation}")

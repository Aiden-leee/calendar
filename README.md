# Calendar Component

년도, 월, 일을 변경하고 선택 할수 있는 Vue Calendar Component 입니다.

<img width="1241" alt="스크린샷 2021-08-11 오후 8 11 29" src="https://user-images.githubusercontent.com/52125590/129307869-75f4b5e6-c0d5-4593-87ab-f97f03763fd0.png">

## 기능과 특징

Vue Component Tag 설정값을 통해 사용합니다.
```vue
<Calendar width="400" :bg="imglist" :position="true" />
```
- 달력의 배경 이미지를 월별로 지정 가능.
default 배경은 없는 이미지 입니다.
- 년,월,일을 클릭 이벤트로 변경 합니다.
- 국문, 영문 언어 설정이 가능합니다. 
- 인라인 모드와 position 모드가 가능합니다.

# FestSpot
## 국내 공연 정보 종합 사이트
### 코리아 IT 아카데미 4월 국비 팀 프로젝트

## 팀원 소개

| 이름 | 담당 업무 |
|---|---|
| (팀장) 김호섭 | 프로젝트 설계, DB 구조 설계, 메인 화면 개발, 게시글 디자인 및 CRUD 구현,<br> 댓글 및 대댓글 CRUD, KOPIS API 데이터 요청 query, 서버 배포 |
| 이수원 | 개발 과정 문서 정리 및 관리, 웹 페이지 디자인, 로그인, 회원가입 기능 구현,<br> 게시글 상세 화면, 글쓰기 화면 디자인 및 구현, 댓글 CRUD |
| 김광호 | DB 구조 설계, 관리자 페이지 기능 구현, 마이페이지, 전체 상단바,<br> 상단바 모달창 구현 |


## Notion    
    https://www.notion.so/4-23f62a2d127080de8306ee22bb15ed51?source=copy_link

## github   
    https://github.com/team-Louisoix/FestSpot

## 구현 화면
### 메인 화면
<img width="1650" height="903" alt="image" src="https://github.com/user-attachments/assets/8d05addf-4fe8-46d8-8166-7acb15168e91" />

### 공연 리스트 화면
<img width="1649" height="927" alt="image" src="https://github.com/user-attachments/assets/88d88c9c-80ab-4322-ba9f-b16063284a83" />

### 공연 상세 페이지
<img width="1649" height="927" alt="image" src="https://github.com/user-attachments/assets/498b994d-0653-4ae6-a78c-6be808d37be0" />

### 회원가입 화면
<img width="1649" height="927" alt="image" src="https://github.com/user-attachments/assets/54c71707-3ff0-49cd-a870-6d81e204866f" />

### 커뮤니티 화면
<img width="1650" height="927" alt="image" src="https://github.com/user-attachments/assets/1e31c1f2-2ab3-4420-8c14-8f26046d4afc" />

### 댓글 구현 화면
<img width="1650" height="927" alt="image" src="https://github.com/user-attachments/assets/9f60d5aa-d812-441c-bbc7-aee5f853fa2a" />


----------------------------

### 관리자 페이지
<img width="1650" height="928" alt="image" src="https://github.com/user-attachments/assets/85d6873d-3cbb-43e1-95b1-bd0a67428db7" />

### 공연 상세 정보 수정 (관리자 페이지)
<img width="1650" height="927" alt="image" src="https://github.com/user-attachments/assets/72feea26-6394-4335-8c1f-38e321e40b41" />

<br><br><br><br><br><br><br><br><br><br>

## 아키텍처
<img width="1425" height="853" alt="image" src="https://github.com/user-attachments/assets/11f8cc3c-bfde-405b-a9c3-25e2ec9514e7" />

## ERD
<img width="1518" height="725" alt="image" src="https://github.com/user-attachments/assets/c0bce786-36b1-4f7e-a4ee-cb0ad9c51c09" />








## 프로젝트 상세
| 구분 | 내용 |
|---|---|
| 컨셉 | 공연예술통합전산망 API 데이터로부터 국내 및 내한 공연, 국내에서 개최되는 페스티벌 관련 정보를 확인할 수 있고<br> 특정 분야의 매니아들이 티켓 양도, 후기 등 교류할 수 있는 커뮤니티를 제공하는 사이트 |
| 기능 | - 회원가입, 로그인, 비밀번호 변경<br>- 공연 및 페스티벌 정보를 카드 형태로 나열, 캘린더에 일정 표시하는 기능<br>- 마이페이지 닉네임 및 비밀번호 변경 기능, 회원탈퇴 기능<br>- 공연 및 페스티벌 목록 표시, 상세 정보 페이지 표시, 댓글 CRUD<br>- 자유/후기/양도/소규모 축제 게시판 CRUD, 상세 페이지, 댓글 및 대댓글 CRUD<br>- 관리자 - API에 공연 및 페스티벌 정보 요청, 원하는 공연 정보 등록,<br> API에 없는 공연 정보 직접 등록, 직접 등록한 공연 정보 관리, 회원 정보 관리<br>- 회원, 비회원 서비스 분리 |
| 특장점 | - 공연예술통합전산망 API로부터 받은 정보를 제공하여 데이터의 정확성 유지<br>- 모바일 환경에서도 사용할 수 있는 반응형 웹 페이지를 제공<br>- 거리 공연 등 정보를 제공하기 어려운 소규모 공연도 홍보 가능 |
| 사용기술 및 개발환경 | - 개발환경 : windows10<br>- 개발도구 : Visual Studio Code, IntelliJ, MySQL WorkBench<br>- 개발언어 및 프레임워크 : JavaScript, ReactJs, Java(JDK 21), SpringBoot(3.4.9)<br>- DB : MySQL<br>- API : 공연예술통합전산망(KOPIS) API, Google Cloud, Kakao Developers |

## 사용자 페이지 기능

| 기능명 | 설명 | 주요 항목 | 상세 |
| --- | --- | --- | --- |
| 상단 바 | 사이트의 기능을 한눈에 볼 수 있도록 Link 버튼을 제공 | 공연 목록, 커뮤니티, 캘린더, 마이페이지 | 공연 목록(국내 공연, 페스티벌, 내한 공연)<br>커뮤니티(자유게시판, 후기 게시판, 양도 게시판)<br>캘린더<br>마이페이지(정보 변경, 내 글 보기)<br>괄호 친 부분은 마우스를 호버하면 아래로 나타나야 함 |
| 공연 목록 화면(홈 화면, 유저) | 관리자가 설정한 공연 목록을 사용자에게 카드 형식으로 제공 | 포스터 사진, 공연명, 날짜, 지역, 위치 | 홈 화면 접속 시 DB에서 데이터를 받아와 포스터 사진 기준 카드 형식으로 페이지네이션<br>페이지 별 출력 내용은 캐시에 저장, 새로운 페이지는 DB에서 가져옴<br>유저 페이지에 등록된 공연은 아침 8시~저녁 10시 사이 1시간마다 API로 업데이트 확인 후 적용<br>즐겨찾기 공연에 업데이트가 있으면 알림(빨간 점 등), 읽으면 사라짐<br>+ 업데이트가 있으면 SMS 알림(후순위) |
| 공연 목록 화면(홈 화면, 관리자) | API에서 받아온 모든 공연 목록을 카드 형식으로 제공 | 포스터 사진, 공연명, 날짜, 지역, 위치 | 홈 화면 접속 시 API 호출 → 데이터 받아와 카드 형식으로 페이지네이션<br>유저 페이지 등록 버튼 클릭 시 상세 정보 API 호출 후 (포스터 URL, 공연 ID 등) 데이터 DB 저장<br>누락 공연 정보는 관리자가 수동 등록 필요 |
| 공연 상세 페이지 (피드) | 공연 상세 정보 제공 및 최신 정보 확인 | 공연 ID, 수정 날짜, 내한/페스티벌 여부, 카테고리, 좋아요, 댓글 | 목록 화면에서 피드 클릭 → 공연 ID로 상세 정보 API 호출<br>수정 날짜 비교 후 DB 업데이트 여부 확인 |
| 공연 검색 | 조건에 따라 공연 리스트 검색 | 공연명, 공연 위치, 공연 지역, 날짜 범위 | 검색어 입력 후 DB의 공연명, 위치, 날짜와 비교하여 일치하는 데이터 출력 |
| 캘린더 | 캘린더에 공연 날짜를 표시, 즐겨찾기 공연은 색상 구분 | 공연 날짜, 공연명 등 | 날짜 기반 DB 렌더링 → 즐겨찾기 여부 확인 후 색상 표시<br>즐겨찾기만 보기 / 전체 보기 가능 |
| 공연 정렬/필터 | 공연 카드 정렬 및 카테고리 별 구분 출력 | 날짜순(기본), 좋아요순, 지역, 카테고리 | 지역: 체크박스 다중 선택 (서울+부산 등)<br>카테고리: 섹션별 구분 출력 |
| 공연 댓글 | 공연 상세에서 댓글 작성 기능 | 텍스트 댓글 | 사진 업로드 없음<br>피드 삭제 시 댓글도 함께 삭제 |
| 커뮤니티 게시판 | 커뮤니티 공간 제공 | 자유게시판, 후기, 양도 게시판 / 사진 업로드 / 댓글 | 게시판 별로 분리<br>사진 업로드 가능, 댓글/대댓글 기능 지원<br>게시글 삭제 시 댓글도 모두 삭제 |
| 마이페이지 | 유저 개인 정보 및 활동 관리 | 내 정보 수정 / 내가 쓴 글 / 즐겨찾기한 공연 | 계정 정보 변경 페이지 or 모달<br>본인이 작성한 게시글/댓글 확인<br>즐겨찾기 공연은 DB에서 가져와 카드 목록 구성 |


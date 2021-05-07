# 박스 이동 구성

1. 동작

   - 두 개의 사각형을 이동시킬 수 있어야 합니다.
   - 두 개의 사각형을 선으로 연결할 수 있어야 합니다.

2. 스타일

   - 사각형 내부의 점은 마우스를 가져가기 전에 활성화되지 않아야 합니다.
   - 두 사각형을 연결하기 전과 연결한 후의 선 색상과 스타일이 달라야 합니다.

## 구현한 방식

1. index.html
   - svg객체는 미리 하나 생성해둠(선을 하나만 만든다고 가정)
2. index.js
   - App 객체 생성
3. App.js
   - box 객체 생성
   - btn 객체(사각형 내부점) 생성
   - isConnecting, updateConnection, getConnection 들은 사각형끼리 연결할때 공통으로 사용할 정보를 공유하기 위함
4. Box.js
   - init 함수는 element를 생성한다.
   - 이 element에는 boxEventStart, boxMoving, boxFinishMoving 동작을 등록한다.
   - boxMoving 메소드 내의 boxConnected의 경우 선이 연결되어있을때 이 선의 위치도 옮기기 위해서 처리하는 것
5. Btn.js
   - init 함수는 element를 생성한다.
   - btnEventStart내에서 선이 그려지던 중인지 아닌지를 판단해서 startConnecting, endConnecting 를 실행한다.
   - 선의 경우 svg path 객체의 attribute를 변경해서 마우스에 따라 이동하도록 함
   - 선의 스타일은 css로 적용

## ref

- svg: https://developer.mozilla.org/en-US/docs/Web/API/Document/createElementNS
- 흐르는 것 참고: http://bl.ocks.org/nitaku/6354551
- https://gigacore.github.io/demos/svg-stroke-dasharray-generator/
- path: https://developer.mozilla.org/ko/docs/Web/SVG/Tutorial/Pathss
- https://greensock.com/forums/topic/14780-drawing-an-svg-path-with-the-mouse/
- https://www.youtube.com/watch?v=ZJSCl6XEdP8
- svg line 추가하는 것: https://stackoverflow.com/questions/35134131/svg-adding-a-line-with-javascript
- box 이동: https://www.w3schools.com/howto/howto_js_draggable.asp
- blog: https://sas-study.tistory.com/141
- svg: https://www.motiontricks.com/creating-dynamic-svg-elements-with-javascript/
- flowing dotted line: http://bl.ocks.org/nitaku/6354551

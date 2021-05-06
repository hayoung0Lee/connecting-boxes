# 박스 이동 구성

1. 동작

   - 두 개의 사각형을 이동시킬 수 있어야 합니다.
   - 두 개의 사각형을 선으로 연결할 수 있어야 합니다.

2. 스타일

   - 사각형 내부의 점은 마우스를 가져가기 전에 활성화되지 않아야 합니다.
   - 두 사각형을 연결하기 전과 연결한 후의 선 색상과 스타일이 달라야 합니다.

## 구현한 방식

1. div 2개를 생성 후 `init` 함수내에서 모든 box에 eventListener를 붙임, 이때 두 div는 모두 `position: absolute`이다.

   - boxEventStart: box를 처음 선택했을때 실행, 이 함수에서 box를 선택했는데, 사각형 내부 점을 선택했는지 처리
   - boxMoving: box를 드래그 할때 동작을 처리
   - boxFinishMoving: 박스에서 마우스를 뗏을때 일어나는 동작을 처리

2. boxEventStart 상세 설명

   - boxDrag: 드래그 중이라는 것을 `isDrawing` flag를 통해서 표시하고, `isConnecting`은 0(false)로 지정한다.

3. boxMoving

   - `boxOrBtn(e) === "box"`로 box인것을 확인하고, drawing 중이었을때 처리를 한다.
   - pos1, pos2, pos3, pos4 를 이용해서 offset 값을 활용해서 위치를 조정한다, [참고자료](https://www.w3schools.com/howto/howto_js_draggable.asp)
   - 이때 boxConnected라는 객체를 통해서 선택된 박스와 연결된 선이 있다면 해당 선의 위치를 업데이트 한다.

4. boxFinishMoving

   - box이동이 다 끝났으면 `isDrawing = false`로 설정하고 pos1, pos2, pos3, pos4를 초기화한다.

5. btnDrag:

   - boxEventStart에서 사각형 내부점을 선택했을때 실행되는 함수이다. 이 함수내에서는 `isConnecting === 0(false)`이면 새로운 startConnecting 함수를 호출하고, 이미 connecting 되던 중이면 endConnecting 함수를 호출 한다.

6. startConnecting

   - cursor의 모양을 move로 바꾸었다.
   - 선택했을때 container에 mousemove 이벤트를 붙여서 마우스 이동에 따라 선이 그려질 수 있도록 했다.
   - 선의 style은 css를 통해서 구현했다.
   - 현재 선택된 내부 점의 dataset 속성의 값을 읽어와서 어떤 박스인지, 왼쪽인지 오른쪽인지를 체크하고, 이에 따라 시작위치를 보정한다. 이때 시작점은 boxConnected 객체에 값을 저장한다.

7. drawConnectingLine

   - 마우스의 위치를 e.clientX, e.clientY 를 이용해서 찾아서 이를 path의 모양을 업데이트한다.

8. endConnecting

   - `e.target.classList.value !== target.classList.value`이부분은 시작객체와 끝난 객체가 다른 div에 포함된것을 확인하려고 넣은 것이다.
   - 끝났을때의 위치도 boxConnected에 추가한다.
   - 제대로 그려지지 않았을때(같은 객체의 내부점을 클릭했을때)는 boxConnected를 초기화해서 box를 이동할때 처리가 일어나지 않도록 한다.

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

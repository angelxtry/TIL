# react에서 chartjs 사용하기

side project를 진행하고 있는데 chart를 쓸 일이 있어서 사용법을 확인해봤다.

어떤 chart를 써야하나 검색을 해봤는데 chart.js가 무난해보였다. 그래서 일단 진행.

## setting

매번하는 것.

```cmd
create-react-app react-chart-js
cd react-chart-js
yarn add chart.js
```

`chartjs`는 `canvas`에 그려진다.

(`canvas`가 무엇인지는 차차 알아보자 ㅠㅠ)

그래서 `div`에 적당히 붙이지 못하고 `canvas` tag로 붙여야한다.

도넛 차트를 한번 그려보자.

## 도넛 차트 그려보기

`ChartDoughnut.js` 파일을 하나 생성했다.

```js
import React, { useEffect, useRef } from "react";
import Chart from "chart.js";

const ChartDoughnut = ({ data, labels }) => {
  const chartRef = useRef();

  useEffect(() => {
    const drawChart = () => {
      const config = {
        type: "doughnut",
        data: {
          datasets: data,
          labels: labels
        },
        options: {
          responsive: true,
          legend: {
            position: "top"
          },
          title: {
            display: true,
            text: "Chart.js Doughnut Chart"
          },
          animation: {
            animateScale: true,
            animateRotate: true
          }
        }
      };
      const currentChartRef = chartRef.current.getContext("2d");
      new Chart(currentChartRef, config);
    };
    drawChart();
  }, [data, labels])

  return <canvas ref={chartRef} />;
};

export default ChartDoughnut;

```

`ChartDoughnet`은 도넛 차트를 그릴 때 사용할 `data`와 `labels`를 param으로 받는다.

```js
const chartRef = useRef();

...

return <canvas ref={chartRef} />;
```

`getElementById`롤 `canvas` tag를 참조할 수도 있지만 `useRef`를 이용했다.

`useEffect` 안의 코드는 chart를 설정하고 그리는 부분이다.

```js
const currentChartRef = chartRef.current.getContext("2d");
new Chart(currentChartRef, config);
```

`Chart` 생성자에 ref와 config를 넣어주면 chart가 생성된다.
`getContext("2d")`는 뭔지 잘 모르겠다 ㅠㅠ
삭제해도 잘 동작하긴하던데... 이것도 나중에 찾아보자.

`config`를 만들어서 chart의 type, data, labels, options 등을 설정했다.

`type`은 말 그대로 chart의 종류를 의미한다. chart에 따라 데이터의 종류가 달라진다.

`options`에서는 `responsive`, `legend`, `title`, `animation` 등을 설정한다.

`responsive`를 true로 설정하면 해당 영역내에 최대 크기로 그려지고 영역의 크기에 따라 차트의 크기로 조정된다.
false로 설정하고 size를 따로 설정하지 않으면 최소 크기로 그려진다.

`App.js` 코드는 다음과 같다.

```js
import React from "react";

import ChartDoughnut from "./ChartDoughnut";

function App() {
  const data = [
    {
      data: [10, 20, 30, 40, 50],
      backgroundColor: ["#f6b93b", "#e55039", "#4a69bd", "#60a3bc", "#78e08f"]
    }
  ];

  const labels = ["one", "two", "three", "four", "five"];

  return (
    <div className="App">
      <ChartDoughnut data={data} labels={labels} />
    </div>
  );
}

export default App;

```

## fin

간단하게 chart가 그려지니 신기하기만 하다.

도넛 차트를 그려봤으니 side project에 필요한 바 차트도 한번 그려봐야겠다.

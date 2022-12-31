# 함수형 프로그래밍, 실무에서 사용할 수 있나요? (feat. TypeScript, Nest.js)

해당 코스는 아래와 같은 주제로 진행돼요

- 함수형 프로그래밍의 기본 개념과 친숙해질 거예요.
- 함수형 패러다임으로 사고하며, 좋은 코드란 무엇일까 함께 고민하는 거예요.
- 실무에서 사용하는 아키텍처에서 함수형 프로그래밍의 사용 사례를 경험해 보는 거예요.

## 사전과제 진행 가이드

- 주제 전달을 위해 언어와 프레임워크를 선정했습니다.
- TypeScript, [Nest.js](https://docs.nestjs.com/), [FxTS](https://fxts.dev/) 를 사용해서 강의를 진행합니다.
- 강의 수강 전 미리 숙지하면 좋을 내용들로 사전과제를 준비했습니다.
  > 사전과제는 해당 레포지토리 **Issues** 탭에 미리 올려 둔 template 을 복사해서 새로운 이슈로 사전과제 풀이를 올려주세요. (Pull Request X)

## 사전과제

1. 본인이 작성했던 코드 중 공유하고 싶은 코드를 이유와 함께 마크다운 코드블락을 사용해 올려주세요
   - 언어 상관없음
   - 어떤 로직이든 상관없음
   - 단, 길이가 길지 않은 함수 단위가 좋습니다

```ts
const TodoAddPage = () => {
  const [todoInfo, setTodoInfo] = useState({ title: '', content: '' });
  const navigate = useNavigate();

  const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setTodoInfo({ ...todoInfo, [e.target.name]: e.target.value });
  };

  const addTodo = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    console.log(todoInfo);
    createTodo(todoInfo).then(() => {
      console.log('add todo successed!');
      navigate(`/todo`);
    });
  };
};
```

typeScript로 구현한 todo-list의 일부분
처음으로 jsx를 모두 tsx로 변환하여 리팩토링한 프로젝트라서 의미가 있습니다
처음에는 조금 번거롭지만 숨겨진 error를 더 빨리 찾을 수 있다는 장점이 있다고 생각합니다

2. Layered Architecture(계층 아키텍처)에 대해서 설명해 주세요
   https://hudi.blog/static/9f7af0d3c4914a7506fb5fbb05f7d683/ca1dc/scenario.png
   소프트웨어 개발에서 일반적으로 사용되는 아키텍처 중 하나
   각 계층은 어플리케이션 내에서 특정 역할과 관심사(화면 표시, 비즈니스 로직 수행, DB작업 등)별로 구분

사용자가 특정 고객 정보를 요청한 상황을 가정하여, Layered Architecture 가 이 요청을 수행하는 시나리오

```
  사용자가 보고있는 화면(Customer Screen, 흔히 말하는 View 라고 할 수 있을 것 같다)에서 사용자는 고객 정보를 요청한다.
  1) 이 요청은 그 요청을 처리할 수 있는 모듈이 무엇인지 알고있는 Customer Delegate (흔히 말하는 Controller 라고 할 수 있을 것 같다) 로 전달된다. Customer Delegate 는 해당 요청을 처리하기 위해 Business Layer 의 Customer Object 로 요청을 다시 전달한다.
  2) Customer Object는 요청을 받고 비즈니스 로직을 수행하기 위한 데이터를 얻기 위해, Persistence Layer의 Customer dao 와 Order dao 에 요청을 보낸다.
  3) Persistence Layer 의 DAO들은 요청을 수행하기 위해 Database Layer 에 접근하여 데이터를 가져온다.
  4) 이 요청은 다시 반대로 Persistence Layer → Business Layer → Presentation Layer 로 전달되고 최종적으로 사용자에게 전달된다.
```

3. Dependency Injection(의존성 주입)의 개념과 함께, 왜 필요한지 작성해 주세요
   의존성 주입은 객체가 의존하는 또 다른 객체를 외부에서 선언하고 이를 주입받아 사용하는 것

```
  의존성 주입을 사용하는 이유?

  1. 의존성이 줄어든다.
    의존한다는 것은 그 의존 대상의 변화에 취약하다는 것이다. (대상이 변화했을 때, 이에 맞게 수정해야함)
    의존성 주입으로 구현했을 때, 주입 받는 대상이 변하더라도 그 구현 자체를 수정할 일이 없거나 줄어듬

  2. 재사용성이 높은 코드가 된다.
    하나의 클래스 내에서 사용하던 클래스를 별도로 구분하여 구현하면 다른 클래스에서 재사용이 가능

  3. 테스트하기 좋은 코드가 된다.
    두 클래스의 테스트를 분리하여 진행할 수 있음

  4. 가독성이 높아진다.
    기능들을 별도로 분리하게 되어 자연스럽게 가독성이 높아진다.

  https://jenkov.com/tutorials/dependency-injection/dependency-injection-benefits.html
```

4. 본인이 사용하는 언어의 Functional Programming(함수형 프로그래밍) 스펙을 예제와 함께 소개해 주세요
   저는 주로 js로 개발을 하고 있습니다
   ES6에 내장되어 있는 map, filter, reduce, find등의 함수를 자주 사용하고 있습니다
   react로 개발하는 프로그램의 경우 Lodash/Underscore.js를 자주 사용했었는데 요새는 순수 함수로 더 자주 함수형 프로그래밍을 구현하고 있습니다

```js
  const users = [
    { user: 'joey', age: 32 },
    { user: 'ross', age: 41 },
    { user: 'chandler', age: 39 },
  ];

  // Native - 더 빠름
  users.find(function (o) {
    return o.age < 40;
  });

  // lodash
  _.find(users, function (o) {
    return o.age < 40;
  });

  const numbers = [10, 40, 230, 15, 18, 51, 1221];

  // lodash - 더 빠름
  _.filter(numbers, (num) => num % 3 === 0);

  // Native
  numbers.filter((num) => num % 3 === 0);
```

5. (코드 작성) 다음 스펙을 만족하는 delay 함수를 작성해 주세요 (hint: Promise 사용)

```ts
  type SomeFunctionReturnString = () => string;

  function delay(f: SomeFunctionReturnString, seconds: number): Promise<string> {
    // 해당 함수 내부를 구현해 주세요
  }

  // 코드
  function delay(f: SomeFunctionReturnString, seconds: number): Promise<string> {
    let timeoutId: NodeJS.Timeout;
    timeoutId = setTimeout(() => {}, 1000 * seconds);
    global.clearTimeout(timeoutId);

    return new Promise((resolve, rejects) => {
      f();
      console.log(`after ${seconds} seconds`);
      resolve('successfully done');
      rejects('Error: failed');
    });
  }

  const success = () => {
    return 'successfully done';
  };

  const fail = () => {
    throw new Error('failed');
  };

  delay(success, 2)
    .then((res) => console.log(res))
    .catch((e) => console.log(e));

  delay(fail, 2)
    .then((res) => console.log(res))
    .catch((e) => console.log(e));
```

   **결과값**

```text
  $ ts-node delay.ts
  after 2 seconds
  successfully done
  Error: failed
```

6. 강의를 통해서 기대하는 바, 또는 얻고 싶은 팁을 적어주세요
```
  기능뿐만 아니라 가독성 좋은 코드를 디자인하고 작성하는 방법을 학습하고 싶습니다
  집단 지성의 힘을 얻어 다양한 관점을 배우고 싶습니다
  멘토님의 실무 경험에서 나오는 노하우를 전수받고 싶습니다
  해당 강의 주제 뿐만 아니라 백엔드 개발의 트렌드를 배우고 따라가고 싶습니다
```
# ПРОЕКТ gitTreiner (PWA)

## ПРЕДНАЗНАЧЕНИЕ:

Поддержание словарного запаса.
Реализовано в виде теста.

Главной ценностью приложения являяется возможность редактирования заметки к повторяемому слову.

Заметка представлена в виде маркдаун файла, расположенного на Гитхабе. Если пользователь забыл значение слова, то по клику на него открывается модальное окно с заметкой, где либо представлены распростаненные словосочетания и примеры (если пользователь их ранее заполнил), либо возможен переход в интерфес Гитхаба для дополнения файла и последующего его коммита.

Лично я для дополнения заметки испльзую нейросеть, куда вставляю слово (для удобства при открытии модалки слово автоматически копируется в буфер).

Нахожу этот метод самым эфективным. По большому счету для этой нужды и сделано приложение. Испльзую ежедневно, и например, на данный момент мной создано около трех тысяч собственных заметок.

Дополнительным преимуществом полагаю "отказоустойчивость", т.е. независимость от использования сторонних интернет-сервисов для изучения слов. Пользователь имеет полный контроль над файлами заметок к изучаемым словам - их всегда можно спулить с Гитхаба и хранить/редактировать локально.

Возможно использование без интернета.

## ДЕПЛОЙ по ссылке:

[gitTreiner](https://saparovpetr.github.io/gitTreiner/)

## КАК РАБОТАЕТ ПРИЛОЖЕНИЕ:

### Понятия:

> **База** (тип TOneWord[]) - конкретный массив объектов типа TOneWord. Каждый уровень - отдельная база.

> **Колллекция**- короткий массив, полученный из Базы (сформирован из рандомно отобранных элементов Базы),

> **Рабочий элемент** - первый элемент Коллекции.

### Логика:

- При инициализации приложения, устанавливается режим по-умолчанию `AppMode.Dif` `(заметка № 1)`,
- Следом выбирается База (режиму `AppMode.Dif` соответствует База `difWordBase`) `(заметка № 2)`,
- далее функцией `fetchCollection` из выбранной Базы формируется Коллекция (заметка № 3),
- Коллекция записывается в стор `(заметка № 4)`, а каждый ее объект дополняется ключом ID с уникальной значением `(заметка № 5)`,
- Компонент `WordItem` рендерит даннные Рабочего элемента Коллекции `(заметка № 6)`, а также прокидывает их в компонент `OptionList` `(заметка № 7)`,
- компонент `OptionList` получает данные из Рабочего элемента Коллекции (т.е. верный вариант перевода `(заметка № 8)`), а также из текущей Базы (три рандомных неверных варианта перевода `(заметка № 9)`),
- следом компонент `OptionList` создает из полученных данных (четырех вариантов перевода) новый массив `shuffledArrey` и перемешивает их индексы в массиве утилитой `shuffle` `(заметка № 10)`,
- далее `(заметка № 11)` `shuffledArrey` записывается в стейт компонента (в массив `preparedArrey`), чтобы данные не обновлялись при ререндериге `OptionList` (например, при открытии-закрытии мадального окна),
- пользователь выбирает ответ, если он невыерный, компонет ответа меняет цвет, а если верный, то первый элемент Колекции удаляется из нее, компонент WordItem ререндерится `(заметка № 12)`,
- так происходит пока не кончится Коллекция,
- если Коллекция пустеет `(заметка № 13)`, `FunctionalComponent` отрисовывает "поздравление" и кнопку с колбеком для перезапуска приложения.

### Паралельная логика:

- рендеринг компонентов `WordItem` и `Modal` сопровождается выполнением хука `useEffect`, воспроизводящего аудио по ссылке публичного api онлайн-школы SkyEng `(заметка № 14)`,
- Открытие модального окна сопровождается копированием словосочетания в буфер обмена `(заметка № 15) `операционки утилитой `copyTextToClipboard`,
- некоторые записи данных в стор (данные о выбранном режиме, данные о прогрессе) сопровождаются записью в `LocalStorage` браузера, чтобы эти данные не проподали при неактивности приложения `(заметка № 16)`. Может когда-нибудь прикручу сервер, но это вряд ли.

## БАГИ С КОТОРЫМИ МОЖНО ЖИТЬ:

- Консоль выдает ошибку NotAllowedError: `play() failed because the user didn't interact with the document first`, поскольку код содержит автовоспроизведение аудио-файла без спроса пользователя,
- В режиме разработки аудио воспроизводится дважды из-за строго режима,
- В режиме разработки из-за строго режима также дважды увеличивается счетчик,

## БАГИ К УСТРАНЕНИЮ:

- Крах при обновлении страницы в случае, если открыта модалка.

## ПЛАНЫ (но это не точно):

- найти дизайнера и переверстать/переанимировать - чтобы было с домино и медведями;
- персонализировать приложение - позволить пользователю задавать путь к собсвтенному репозиторию, который он сможет заранее форкнуть из моего публичного `emptyMdFilesForFork`. Сейчас же захардкоджен путь к моему `mdWords`;
- протестировать в других браузерах. Бывают (но почему-то не всегда) лаги в Сафари при смене Базы.

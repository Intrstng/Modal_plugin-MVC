Используя результат предыдущего задания modal-MVC.html, необходимо доработать функционал так, чтобы: 

1. Плагин и его классы и внутренняя реализация не высвечивались в глобальной области видимости;
2. При подключении на страницу как отдельный js-файл и инициализации плагина, плагин должен найти все ссылки с дата-атрибутом "data-supermodal" и используя значение этого дата-атрибута инициализировать новое модальное окно с id равным этому значению (верстка с модалкой, которую нужно показать, должна обязательно присутствовать на странице).
3. Если ссылка дополнительно содержит дата-атрибуты "data-supermodal-title" и "data-supermodal-content" (т.е. есть все три дата-атрибута и верстка для модального окна), то необходимо заполнить заголовок и контент модального окна содержимым этих атрибутов.
4. Если нет верстки модального окна, но есть все три дата-атрибута, то создать/добавить на страницу верстку модального окна методом из плагина (т.е. верстка строится вашим плагином), заполнив заголовок и контент значениями из дата-атрибутов.

В реализации задачи показать как минимум три модальных окна:
1. с формой и инпутами;
2. с видео;
3. и просто окно благодарности с текстом.
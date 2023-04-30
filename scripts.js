    /* ------- begin view -------- */
    function ModalView() {
      let myContainer = null;
      let myModal = null;
      let myModalOverlay = null;
    }
      ModalView.prototype.init = function (container, containerModal, overlay) {
        myContainer = container; // контейнер с элементом - кнопка открыть
        myModal = containerModal; // контейнер модального окна
        myModalOverlay = overlay; // overlay
      }
    
      ModalView.prototype.myModalShow = function () {
        myModal.classList.remove("modal_closed");
        myModalOverlay.classList.remove("modal_closed");
      }

      ModalView.prototype.myModalHide = function () {
        myModal.classList.add("modal_closed");
        myModalOverlay.classList.add("modal_closed");
      }
 
    /* -------- end view --------- */

    /* ------- begin model ------- */
    function ModalModel() {
      let myModalView = null;
      let user = {};
    }
      ModalModel.prototype.init = function (view) {
        myModalView = view;
      }

      ModalModel.prototype.openModal = function () {
        myModalView.myModalShow();
      }

      ModalModel.prototype.closeModal = function () {
        myModalView.myModalHide();
      }

      ModalModel.prototype.myModalShow = function () {
        myModalView.myModalShow();
      }

      ModalModel.prototype.myModalHide = function () {
        myModalView.myModalHide();
      }
    
    /* -------- end model -------- */

    /* ----- begin controller ---- */
    function ModalController() {
      let myModalContainer = null;
      let myModalModel = null;
    }
      ModalController.prototype.init = function (model, containerModal, containerMain) { // получаем кнопки и вешаем обработчики
        myModalContainer = containerModal;  // это модальное окно
        myModalModel = model; // это связь с моделью
        myContainer = containerMain; // это контейнер (он включает в себя элемент для вывода данных, кнопку открыть окно и кнопку очистить)
        const btnOpenModal = myContainer.querySelector(".modal-open");
        btnOpenModal.addEventListener("click", (e) => {
          this.openModal(e);
        });
        const btnModalCancel = myModalContainer.querySelector(".modal__cancel");
        btnModalCancel.addEventListener("click", (e) => this.hideModal(e));
        const btnModalClose = myModalContainer.querySelector(".modal__close");
        btnModalClose.addEventListener("click", (e) => this.hideModal(e));
      }

      ModalController.prototype.openModal = function (e) {
        e.preventDefault();
        myModalModel.openModal();
      }

      ModalController.prototype.hideModal = function (e) {
        e.preventDefault();
        myModalModel.closeModal();
      }
    /* ------ end controller ----- */

    // Глобальная инициализация
    const appModalView = new ModalView();
    const appModalModel = new ModalModel();
    const appModalController = new ModalController();
    const container = document.querySelector("#container"); // по уникальному id (т.к. он может быть только один на странице)
    const modalWindow = document.querySelector("#my-custom-modal");
    const overlay = document.querySelector("#modal-overlay");

    // Вызываем init-методы
    // В экземпляр appModalView класса ModalView (Представление) передаем контейнер (он включает в себя элемент для вывода данных и кнопку открыть окно, кнопку очистить) и контейнер модального окна
    // Также передаем overlay, чтобы при увеличении числа экземпляров у каждого была связь со своим оверлеем
    appModalView.init(container, modalWindow, overlay);
    
    // В экземпляр appModalModel класса appModalModel (Модель) передаем экземпляр представления
    appModalModel.init(appModalView);

    // В экземпляр appModalController класса ModalController (Контроллер) передаем модель и 2 вышеупомянутых контейнера
    appModalController.init(appModalModel, modalWindow, container);
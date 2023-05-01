    const Module = (function() {
    
    /* ------- begin view -------- */
    function ModalView() {
      let myContainer = null;
      let myModalWindowContainer = null;
      let myModalOverlay = null;
      let actualModalWindow = null;
    }
      ModalView.prototype.init = function (container, overlay) {
console.log('container', container);
        if (container) {
          myModalWindowContainer = container; // контейнер модального окна
        } else {
          this.buildModalWindow();
          myModalWindowContainer = document.getElementById('my-custom-modal-4');
        }
        myModalOverlay = overlay; // overlay
console.log('INIT myModalWindowContainer', myModalWindowContainer) 
      }
    
      ModalView.prototype.modalShow = function () {
        console.log('VIEW myModalWindowContainer', myModalWindowContainer)
        console.log(myModalWindowContainer)
        myModalWindowContainer.classList.remove('modal_closed');
        myModalOverlay.classList.remove('modal_closed');
      }

      ModalView.prototype.modalHide = function () {
        myModalWindowContainer.classList.add('modal_closed');
        myModalOverlay.classList.add('modal_closed');
      }

      ModalView.prototype.fillModalWindow = function (title, content) {
        myModalWindowContainer.querySelector('.modal-title').textContent = title;
        myModalWindowContainer.querySelector('.modal-content').textContent = content;
      }

      ModalView.prototype.buildModalWindow = function () {
        const modal = document.createElement('div');
        modal.id = 'my-custom-modal-4';
        modal.className = 'modal modal_closed';
        modal.innerHTML = `
          <header class="modal__header">
            <a href="#" class="modal__close" id="modal-close" title="Закрыть модальное окно">Закрыть</a>
            <h2 class="modal-title"></h2>
            <p class="modal-content"></p>
          </header>
          <main class="modal__content">
            <p></p>;
          </main>`;
          document.body.append(modal);
      }

    /* -------- end view --------- */

    /* ------- begin model ------- */
    function ModalModel() {
      let myView = null;
    }
      ModalModel.prototype.init = function (view) {
        myView = view;
      }

      ModalModel.prototype.modalShow = function (modalWindow, modalTitle, modalContent) {
        console.log(modalWindow, modalTitle, modalContent)
        if (modalTitle === undefined && modalContent === undefined) {
          myView.modalShow(modalWindow);
  
          
        } else {
            myView.modalShow(modalWindow);
            this.fillModalWindow(modalTitle, modalContent);
        }

        //this.buildModalWindow(modalTitle, modalContent);
      }

      ModalModel.prototype.modalHide = function (modalWindow) {
        myView.modalHide(modalWindow);
      }

      ModalModel.prototype.fillModalWindow = function (title, content) {
        myView.fillModalWindow(title, content);
      }
      
      ModalModel.prototype.buildModalWindow = function (title, content) {
        myView.buildModalWindow(title, content);
      }
    /* -------- end model -------- */

    /* ----- begin controller ---- */
    function ModalController() {
      let myModalContainer = null;
      let myModel = null;
      let openModalButtons = null;
      let btnCancel = null;
      let btnClose = null;
    }
      ModalController.prototype.init = function (model, containerMain) { // получаем кнопки и вешаем обработчики
        myModel = model; // это связь с моделью
        myContainer = containerMain; // это контейнер (он включает в себя элементы - кнопки 'Открыть окно')
        openModalButtons = containerMain.querySelectorAll('a[data-supermodal]'); // кнопки открыть (с атрибутом data-supermodal)

        openModalButtons.forEach(btn => {
          btn.addEventListener('click', (e) => {
            e.preventDefault();
            this.openModal(e, e.target.dataset.supermodal, e.target.dataset.supermodalTitle, e.target.dataset.supermodalContent);
console.log('e.target.dataset.supermodal', e.target.dataset.supermodal)            
            btnClose = document.querySelector(`#${e.target.dataset.supermodal} .modal__close`);
console.log('btnClose', btnClose)
            btnClose.addEventListener("click", (e) => this.hideModal(e, e.target.dataset.supermodal));
            if (e.target.dataset.supermodalTitle === undefined || e.target.dataset.supermodalContent === undefined) {
              btnCancel = document.querySelector(`#${e.target.dataset.supermodal} .modal__cancel`);
              btnCancel.addEventListener('click', (e) => this.hideModal(e, e.target.dataset.supermodal));
            }      
          });
        });
      }

      ModalController.prototype.openModal = function(e, modalWindow, modalTitle, modalContent) {
        console.log('openModal', modalWindow);
        e.preventDefault();
        myModel.modalShow(modalWindow, modalTitle, modalContent);
      }

      ModalController.prototype.hideModal = function(e, modalWindow) {
        console.log('hideModal');
        e.preventDefault();
        myModel.modalHide(modalWindow);
      }
    /* ------ end controller ----- */
    return {
      version: '0.0.1',
      init: function(container) {
        this.main();
        // Инициализация
        const appModalView = new ModalView();
        const appModalModel = new ModalModel();
        const appModalController = new ModalController();
        const overlay = document.getElementById('modal-overlay'); // поиск через document т.к. оверлей согласно верстке не входит в container;
        const openModalButtons = container.querySelectorAll('a[data-supermodal]');
   
        // Вызываем init-методы
        // В экземпляр appModalView класса ModalView (Представление) передаем контейнер и оверлей, т.е. аналог вызова (appModalView.init(container, overlay)) для каждого отдельного модального окна;


// openModalButtons.forEach(btn => {
//   appModalView.init(document.getElementById(btn.dataset.supermodal), overlay);
// }); // не сработало, т.к. во view запоминается последнее переданное значение из массива
// Поэтому в инициализации вынуждены использовать метод addEventListener('click', fn) и теперь инициализация View будет происходить при каждом клике по кнопкам 'Открыть окно' 
// можно было сделать инициализацию View из контроллера, но тогда пришлось бы пробрасывать контейнер модального окна и оверлей через Model во View, но Model не должна ничего знать про верстку
openModalButtons.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    appModalView.init(document.getElementById(btn.dataset.supermodal), overlay);
  });
});
        
        // В экземпляр appModalModel класса appModalModel (Модель) передаем экземпляр представления
        appModalModel.init(appModalView);

        // В экземпляр appModalController класса ModalController (Контроллер) передаем модель и контейнер
        appModalController.init(appModalModel, container);
      },
      main: function() {
        console.log(`Modal plugin (v. ${this.version}) was initilized.`);
      }
    }
  })();

  Module.init(document.getElementById('container'));
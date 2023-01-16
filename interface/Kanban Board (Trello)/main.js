/*** FUNCTIONS ***/

function elem(id) {
  var e = document.getElementById(id)
  return e
}

function allowDrop(ev) {
  ev.preventDefault()
}

function drag(ev) {
  ev.dataTransfer.setData('text', ev.target.id)
}

function drop(ev, el) {
  ev.preventDefault()
  var data = ev.dataTransfer.getData('text')
  el.appendChild(elem(data))
  elem(data).removeAttribute('style')
  el.classList.remove('drag-enter')
  countTask()
  saveBoards()
}

function dragEnter(e) {
  e.target.classList.add('drag-enter')
}

function dragLeave(e) {
  e.target.classList.remove('drag-enter')
}

function delTaskDrop() {
  var elemt = elem('delete-list')
  elemt.innerHTML = ''
}

function changeTask() {
  var taskList = document.querySelectorAll('.txt')
  for (i = 0; i < taskList.length; i++) {
    taskList[i].onclick = function () {
      showModal()
      okModal(this.parentNode.id)
    }
  }
}

function showModal() {
  var modalBox = elem('modalBox')
  modalBox.style.display = 'block'
  var modalOverlay = elem('modalOverlay')
  modalOverlay.style.display = 'block'
}

function okModal(id) {
  var newText = elem('taskText')
  var theTask = elem(id)
  var theTaskStyle = elem(id).parentNode.id
  console.log(theTaskStyle)
  elem('modalBox').setAttribute('class', 'b-' + theTaskStyle)
  newText.value = theTask.childNodes[0].innerText
  newText.select()
  globalID = id
}

function closeModal() {
  var modalBox = elem('modalBox')
  modalBox.style.display = 'none'
  var modalOverlay = elem('modalOverlay')
  modalOverlay.style.display = 'none'
}
// var closeBox = elem('modalClose');
// closeBox.onclick=closeModal;
// var closeOverlay = elem('modalOverlay');
// closeOverlay.onclick=closeModal;

function upListener(e) {
  e.preventDefault()
  var wrapper = this.parentElement
  if (wrapper.previousElementSibling) {
    wrapper.parentNode.insertBefore(wrapper, wrapper.previousElementSibling)
    saveBoards()
  }
}

function downListener(e) {
  e.preventDefault()
  var wrapper = this.parentElement
  if (wrapper.nextElementSibling) {
    wrapper.parentNode.insertBefore(wrapper.nextElementSibling, wrapper)
    saveBoards()
  }
}

function saveBoards() {
  var toDoContent = elem('ul-todo').innerHTML
  var workInContent = elem('ul-working').innerHTML
  var doneContent = elem('ul-done').innerHTML
  localStorage.setItem('listToDo', toDoContent)
  localStorage.setItem('listWorking', workInContent)
  localStorage.setItem('listDone', doneContent)
  if (elem('ul-urgent') !== null) {
    var urgentContent = elem('ul-urgent').innerHTML
    localStorage.setItem('listUrgent', urgentContent)
  } else {
    localStorage.removeItem('listUrgent')
  }
}

//change opacity
function showOpac(val) {
  var zeroDot = '0.'
  var boardOpacNum = document.querySelectorAll('#myLists > div')
  for (var i = 0; i < boardOpacNum.length; i++) {
    if (val == '10') zeroDot = ''
    boardOpacNum[i].style.background = 'rgb(247 247 247 / ' + zeroDot + val
  }
  localStorage.setItem('OptOpacityLevel', val)
}

//delete task
function delTask(ev, elemt) {
  ev.preventDefault()
  if (localStorage.getItem('OptHideConfirm') !== null) {
    //borrar del tiron
    elemt.remove()
    saveBoards()
    countTask()
    document.querySelector('.deleteWarnig').classList.remove('showWng')
  } else {
    //preguntar antes
    elem('confirmTitle').innerHTML = 'THE TASK'
    elem('confirmDelete').style.display = 'block'
    elem('confirmBox').style.display = 'block'
    //confirm delete
    var delConfirm = elem('confirmBtn')
    delConfirm.addEventListener('click', function () {
      elemt.remove()
      saveBoards()
      countTask()
      elem('confirmDelete').style.display = 'none'
      elem('confirmBox').style.display = 'none'
    })
    //cancel delete
    var canConfirm = elem('confirmCls')
    canConfirm.addEventListener('click', function () {
      elem('confirmDelete').style.display = 'none'
      elem('confirmBox').style.display = 'none'
    })
  }
}

//CHANGE LIST HEIGHT
function changeListHeight(id) {
  elem(id).classList.toggle('active')
  var boards = document.querySelectorAll('#myLists > div')
  for (var i = 0; i < boards.length; i++) {
    boards[i].classList.toggle('full')
  }
  elem('myLists').classList.toggle('full')
  var isActive = elem(id).getAttribute('class')
  if (isActive != '') {
    localStorage.setItem('OptFullBoard', isActive)
    elem('textHeight').innerHTML = 'ADJUST'
  } else {
    localStorage.removeItem('OptFullBoard')
    elem('textHeight').innerHTML = 'FULL'
  }
}

//COUNT TASK
function countTask() {
  var cypher = document.querySelectorAll('.section')
  var totalNum = 0
  for (var i = 0; i < cypher.length; i++) {
    var num = cypher[i].childElementCount
    //console.log(num);
    var parent = cypher[i].parentNode
    var childrn = parent.children[0]
    var nal = childrn.children[0]
    nal.innerHTML = num
    totalNum += num
  }
  elem('totalTask').innerHTML = totalNum
}

//check if confirm
function checkIfCnfr() {
  if (localStorage.getItem('OptHideConfirm') !== null) {
    localStorage.removeItem('OptHideConfirm')
    document.querySelector('.deleteWarnig').classList.add('showWng')
    elem('textWarning').innerHTML = 'HIDE'
  } else {
    localStorage.setItem('OptHideConfirm', 'true')
    document.querySelector('.deleteWarnig').classList.remove('showWng')
    elem('textWarning').innerHTML = 'SHOW'
  }
}

//delete options
function delOptions() {
  localStorage.removeItem('OptShowOptions')
  localStorage.removeItem('OptBackgroundImage')
  localStorage.removeItem('OptFullBoard')
  localStorage.removeItem('OptOpacityLevel')
  localStorage.removeItem('OptHideConfirm')
  localStorage.removeItem('OptHideConfirmUrgent')
  localStorage.removeItem('OptBackgroundImageUrl')
  location.href = location.href
  //location.reload();
}

//toggle options
function openCloseOptions() {
  document.querySelector('.options').classList.toggle('opened')
  if (localStorage.getItem('OptShowOptions') !== null) {
    localStorage.removeItem('OptShowOptions')
    elem('openOptions').innerText = 'OPEN'
  } else {
    localStorage.setItem('OptShowOptions', 'true')
    elem('openOptions').innerText = 'CLOSE'
  }
}

//url img by
function getUrl() {
  var imageUrl = elem('urlImage').value
  localStorage.setItem('OptBackgroundImageUrl', imageUrl)
  var bg = document.getElementsByClassName('overlay-bg')
  var bgClass = bg[0]
  bgClass.setAttribute('style', 'background-image:url(' + imageUrl + ')')
  elem('byUrl').removeAttribute('style')
}

//export
function exportBoard() {
  if (localStorage.length == 0) {
    alert('Nothing to export...')
  } else {
    var fileJKB = ''
    for (x = 0; x <= localStorage.length - 1; x++) {
      fileJKB +=
        localStorage.key(x) +
        ' : ' +
        localStorage.getItem(localStorage.key(x)) +
        '\n'
    }
    var blob = new Blob([fileJKB], {type: 'text/plain'})
    download(blob, 'jkb-saved.txt')
    function download(blob, name) {
      var url = URL.createObjectURL(blob)
      elem('expHidden').href = url
      elem('expHidden').download = name

      var ev = new MouseEvent('click', {})
      elem('expHidden').dispatchEvent(ev)
    }
  }
}

//import
function importBoard() {
  elem('impFile').click()
}

//help
function showHelp() {
  elem('helpContent').classList.toggle('active')
  elem('help').classList.toggle('showing')
}

/*** FUNCTIONS LOCATED IN <HEAD> TAG ON SETTINGS MENU ***/

/*** READY ***/

;(function () {
  //CALCULATE ORDER
  function calcUpDown() {
    var ulPanels = document.querySelectorAll('.section')
    for (var x = 0; x < ulPanels.length; x++) {
      var upLink = ulPanels[x].querySelectorAll('.up')
      for (var i = 0; i < upLink.length; i++) {
        upLink[i].removeEventListener('click', upListener)
        upLink[i].addEventListener('click', upListener)
      }
      var downLink = ulPanels[x].querySelectorAll('.down')
      for (var i = 0; i < downLink.length; i++) {
        downLink[i].removeEventListener('click', downListener)
        downLink[i].addEventListener('click', downListener)
      }
    }
  }

  //TO DO button
  var toDoButton = elem('addToDo')
  var toDoList = elem('ul-todo')
  toDoButton.addEventListener('click', function () {
    var newList = document.createElement('li')
    newList.innerHTML =
      '<span class="txt">New Task</span><span class="idTask"></span><a class="up" href="#"></a><a class="down" href="#"></a><a class="delete" onclick="delTask(event, this.parentNode)" href="#"></a>'

    var lis = document.getElementsByTagName('li')
    var finalID
    if (lis.length == 0) {
      finalID = '0001'
    } else {
      var ids = []
      for (var i = 0; i < lis.length; i++) {
        console.log(lis[i].getAttribute('id').slice(3))
        ids.push(lis[i].getAttribute('id').slice(3))
      }
      finalID = parseInt(ids.sort().pop())
      finalID++
      while (finalID.toString().length < 4) {
        finalID = '0' + finalID
      }
    }

    newList.setAttribute('id', 'li-' + finalID)
    newList.setAttribute('draggable', 'true')
    newList.setAttribute('ondragstart', 'drag(event)')
    newList.setAttribute('ontouchstart', 'drag(event)') /*touch event*/

    newList.childNodes[1].innerText = finalID

    toDoList.prepend(newList)
    changeTask()
    calcUpDown()

    var aux = elem('ul-todo').firstChild
    var foo = aux.children[0]
    foo.click()

    countTask()

    saveBoards()
  })

  //OK BUTTON
  var okButton = elem('taskButton')
  okButton.addEventListener('click', function () {
    var newText = elem('taskText')
    var theTask = elem(globalID).getElementsByTagName('span')[0]
    result = newText.value
    if (result == '') {
      newText.setAttribute('placeholder', 'write something...')
    } else {
      theTask.innerText = result
      closeModal()
      saveBoards()
    }
  })

  //CLOSE MODAL
  var closeBox = elem('modalClose')
  closeBox.onclick = closeModal
  var closeOverlay = elem('modalOverlay')
  closeOverlay.onclick = closeModal

  //DELETE BUTTON
  var deleteButton = elem('deleteItem')
  deleteButton.addEventListener('click', function () {
    if (elem('totalTask').innerHTML == '0') return

    if (localStorage.getItem('OptHideConfirm') !== null) {
      //borrar del tiron
      localStorage.removeItem('listToDo')
      localStorage.removeItem('listWorking')
      localStorage.removeItem('listUrgent')
      localStorage.removeItem('listDone')
      localStorage.setItem('listToDo', '')
      location.href = location.href
      //location.reload();
    } else {
      //alert('¿DELETE ALL?');
      //preguntar antes
      elem('confirmTitle').innerHTML = 'ALL TASKS'
      elem('confirmDelete').style.display = 'block'
      elem('confirmBox').style.display = 'block'
      //confirm delete
      var delConfirm = elem('confirmBtn')
      delConfirm.addEventListener('click', function () {
        localStorage.removeItem('listToDo')
        localStorage.removeItem('listWorking')
        localStorage.removeItem('listUrgent')
        localStorage.removeItem('listDone')
        localStorage.setItem('listToDo', '')
        location.href = location.href
        //location.reload();
        //elem('confirmDelete').style.display = 'none';
        //elem('confirmBox').style.display = 'none';
      })
      //cancel delete
      var canConfirm = elem('confirmCls')
      canConfirm.addEventListener('click', function () {
        elem('confirmDelete').style.display = 'none'
        elem('confirmBox').style.display = 'none'
      })
    }
  })

  //ADD URGENT LIST
  var urgentBoard = elem('addUrgent')
  urgentBoard.addEventListener('click', function () {
    if (elem('ur-gent')) {
      //remove

      var urgTskNum = elem('ur-gent').childNodes[1].childNodes.length
      if (urgTskNum == 0) {
        //alert('sin tareas');
        this.parentNode.classList.remove('active')
        //alert('hay urgent');
        elem('myLists').classList.remove('fourCol')
        elem('ur-gent').remove()
        saveBoards()
      } else {
        //alert('con tareas');
        if (localStorage.getItem('OptHideConfirmUrgent') == null) {
          elem('confirmDelete').style.display = 'block'
          elem('confirmUrgent').style.display = 'block'
          elem('numTaskUrg').innerHTML = urgTskNum
          if (urgTskNum == 1) elem('pluralTsk').style.display = 'none'
          else elem('pluralTsk').removeAttribute('style')

          //confirm remove
          var delConfirmUrgent = elem('confirmUrgentBtn')
          delConfirmUrgent.addEventListener('click', function () {
            elem('addUrgent').parentNode.classList.remove('active')
            elem('myLists').classList.remove('fourCol')
            if (elem('ur-gent')) elem('ur-gent').remove()
            saveBoards()
            elem('confirmDelete').style.display = 'none'
            elem('confirmUrgent').style.display = 'none'
          })
          //cancel remove
          var canConfirmUrgent = elem('confirmUrgentCls')
          canConfirmUrgent.addEventListener('click', function () {
            elem('confirmDelete').style.display = 'none'
            elem('confirmUrgent').style.display = 'none'
          })
        } else {
          //alert('sin tareas');
          this.parentNode.classList.remove('active')
          //alert('hay urgent');
          elem('ur-gent').remove()
          saveBoards()
        }
      }
    } else {
      //add
      this.parentNode.classList.add('active')
      elem('myLists').classList.add('fourCol')
      var newBoard = document.createElement('div')
      newBoard.innerHTML =
        '<h3>Urgent <span>0</span></h3><ul id="ul-urgent" class="section" ondrop="drop(event, this)" ondragover="allowDrop(event)" ondragenter="dragEnter(event)" ondragleave="dragLeave(event)"></ul>'
      newBoard.setAttribute('id', 'ur-gent')
      elem('myLists').insertBefore(newBoard, elem('do-ne'))
      if (elem('do-ne').className == 'full') elem('ur-gent').className = 'full'
      if (elem('do-ne').getAttribute('style') != null)
        elem('ur-gent').setAttribute(
          'style',
          elem('do-ne').getAttribute('style')
        )
      saveBoards()
    }
  })

  //DONT SHOW MESSAGE AGAIN
  var checkConfirm = elem('dontShowAgain')
  checkConfirm.addEventListener('change', function () {
    if (this.checked) {
      localStorage.setItem('OptHideConfirm', 'true')
      document.querySelector('.deleteWarnig').classList.remove('showWng')
      elem('textWarning').innerHTML = 'SHOW'
    } else {
      localStorage.removeItem('OptHideConfirm')
      document.querySelector('.deleteWarnig').classList.add('showWng')
      elem('textWarning').innerHTML = 'HIDE'
    }
  })

  //DONT SHOW MESSAGE URGENT AGAIN
  var checkConfirmUrgent = elem('dontShowAgainUrgent')
  checkConfirmUrgent.addEventListener('change', function () {
    if (this.checked) {
      localStorage.setItem('OptHideConfirmUrgent', 'true')
    } else {
      localStorage.removeItem('OptHideConfirmUrgent')
    }
  })

  //CHANGE BACKGROUND IMAGE
  var bg = document.getElementsByClassName('overlay-bg')
  var bgClass = bg[0]

  var changeBgImg = document.querySelectorAll('#bgOptions > span')
  for (var i = 0; i < changeBgImg.length; i++) {
    changeBgImg[i].addEventListener('click', function () {
      var allOpt = this.parentNode.children
      for (var x = 0; x < allOpt.length; x++) {
        if (window.CP.shouldStopExecution(1)) {
          break
        }

        allOpt[x].removeAttribute('class')
      }

      window.CP.exitedLoop(1)

      this.classList.add('selected')
      //aqui
      if (this.innerText.toLowerCase() == 'none')
        bgClass.className = 'overlay-bg'

      if (this.innerText.toLowerCase() == 'url') {
        bgClass.className = 'overlay-bg'

        elem('byUrl').style.display = 'block'

        if (localStorage.getItem('OptBackgroundImageUrl') !== null) {
          bgClass.setAttribute(
            'style',
            'background-image:url(' +
              localStorage.getItem('OptBackgroundImageUrl') +
              ') #fff0;'
          )
        }
      } else {
        bgClass.removeAttribute('style')
        elem('byUrl').removeAttribute('style')

        bgClass.className = 'overlay-bg ' + this.innerText.toLowerCase()
      }

      localStorage.setItem('OptBackgroundImage', this.innerText)
    })
  }

  //IMPORT
  var inputImport = elem('impFile')
  inputImport.addEventListener('change', () => {
    var files = inputImport.files
    if (files.length == 0) return
    const file = files[0]
    var reader = new FileReader()
    reader.onload = (e) => {
      const file = e.target.result
      const lines = file.split(/\r\n|\n/)
      //textarea.value = lines.join('\n');
      var toImport = lines.join('\n')
      var byLine = toImport.split('\n')
      for (var i = 0; i < byLine.length - 1; i++) {
        var toStore = byLine[i].split(' : ')
        localStorage.setItem(toStore[0], toStore[1])
      }
      //location.reload();
    }
    reader.onerror = (e) => alert(e.target.error.name)
    reader.readAsText(file)

    location.href = location.href
  })

  //HELP
  var closeHelp = elem('helpClose')
  closeHelp.addEventListener('click', () => {
    elem('help').click()
  })

  //IF SAVED
  if (localStorage.getItem('listToDo') != null) {
    elem('ul-todo').innerHTML = localStorage.getItem('listToDo')
    elem('ul-working').innerHTML = localStorage.getItem('listWorking')
    elem('ul-done').innerHTML = localStorage.getItem('listDone')

    if (localStorage.getItem('listUrgent') !== null) {
      //alert('no es null');
      elem('myLists').classList.add('fourCol')
      var newBoard = document.createElement('div')
      newBoard.innerHTML =
        '<h3>Urgent <span></span></h3><ul id="ul-urgent" class="section" ondrop="drop(event, this)" ondragover="allowDrop(event)" ondragenter="dragEnter(event)" ondragleave="dragLeave(event)"></ul>'
      newBoard.setAttribute('id', 'ur-gent')
      elem('myLists').insertBefore(newBoard, elem('do-ne'))

      elem('addUrgent').parentNode.classList.add('active')

      if (localStorage.getItem('listUrgent') == '') {
        //saveBoards();
        //elem('ul-urgent').innerHTML = localStorage.getItem('listUrgent');
        //var urgentContent = elem('ul-urgent').innerHTML;
      } else {
        //alert('no esta vacio');
        elem('ul-urgent').innerHTML = localStorage.getItem('listUrgent')
      }
    } else {
      //alert('si es null');
    }
  }

  //OPTIONS
  if (localStorage.getItem('OptShowOptions') !== null) {
    document.querySelector('.options').classList.toggle('opened')
    elem('openOptions').innerText = 'CLOSE'
  }
  //IMAGE
  if (localStorage.getItem('OptBackgroundImage') !== null) {
    var x = document.querySelectorAll('#bgOptions > span')
    for (var i = 0; i < x.length; i++) {
      if (x[i].innerText == localStorage.getItem('OptBackgroundImage')) {
        if (localStorage.getItem('OptBackgroundImage') != 'URL') {
          x[i].click()
        } else {
          x[i].classList.add('selected')
          elem('bg-image').setAttribute(
            'style',
            'background-image:url(' +
              localStorage.getItem('OptBackgroundImageUrl') +
              ')'
          )
        }
      }
    }
  }
  //HEIGHT
  if (localStorage.getItem('OptFullBoard') !== null) {
    elem('boardFull').click()
  }
  //OPACITY
  if (localStorage.getItem('OptOpacityLevel') !== null) {
    elem('boardOpac').value = localStorage.getItem('OptOpacityLevel')
    showOpac(localStorage.getItem('OptOpacityLevel'))
  }
  //CONFIRM
  if (localStorage.getItem('OptHideConfirm') !== null) {
    document.querySelector('.deleteWarnig').classList.remove('showWng')
    elem('textWarning').innerHTML = 'SHOW'
  } else {
    document.querySelector('.deleteWarnig').classList.add('showWng')
    elem('textWarning').innerHTML = 'HIDE'
  }

  changeTask()

  calcUpDown()

  countTask()
})()

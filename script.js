// Buttons
const btnBookmark = document.querySelector('.btn--bk');
const btnBookmarkMob = document.querySelector('.bookmark-img--mobile');
const btnsSelectReward = document.querySelectorAll('.btn--select-reward');
const btnCloseModal = document.querySelector('.modal-close-box');
const btnsContinue = document.querySelectorAll('.btn--continue');
const btnGotIt = document.querySelector('.btn--got-it');
const btnBack = document.querySelector('.btn--back');

const btnBurger = document.querySelector('.burger-icon');

// Modal
const modalSelection = document.querySelector('.selection');
const modalCompleted = document.querySelector('.completed');
const modal = document.querySelector('.modal');

// statistics
const backed = document.querySelector('.backed');
const totalBackers = document.querySelector('.total-backers');
const daysLeft = document.querySelector('.days-left');
const bar = document.querySelector('.bar');

// About

const cardAbout = document.querySelectorAll('.card--about');

// selecttion

const headingSeections = document.querySelectorAll('.heading--seection');
const cardSelections = document.querySelectorAll('.card--selection');

// burger

const burger = document.querySelector('.burger');
const header = document.querySelector('.header__nav-box');

const DUMMY_DATA = {
  totalBacked: 89914,
  totalBackers: 5007,
  daysLeft: 56,

  BambooStandLeft: 101,
  BlackEditionStandLeft: 63,
  MahoganySpecialEditionLeft: 0,
};

function openModal() {
  modal.classList.add('active');
  modalSelection.classList.add('active');
}

function closeModal() {
  modal.classList.remove('active');
  modalSelection.classList.remove('active');
  modalCompleted.classList.remove('active');
}

function formatNumber(num) {
  return num.toLocaleString('en-US');
}

function progressBar(num) {
  const progress = (num / 100000) * 100;
  if (progress > 100) {
    return 100;
  }
  return progress;
}

function getLeftCount(item) {
  const id = item.id;
  const count = (item.querySelector('.count').innerText =
    DUMMY_DATA[`${id}Left`]);

  return count;
}

function getEnteredPledge(item) {
  const inputValue = item.parentElement.querySelector('#pledge-input').value;
  return parseInt(inputValue);
}

function countCheck(item) {
  const count = item.querySelector('.count').innerText;
  const btn = item.querySelector('.btn');
  if (count < 1) {
    item.classList.add('disabled');
    btn.classList.add('disabled');
    btn.innerText = 'Out of stock';
  } else {
    item.classList.remove('disabled');
    btn.classList.remove('disabled');
    btn.innerText = 'Select Reward';
    if (item.classList.contains('card--selection')) {
      btn.innerText = 'Continue';
    }
  }
}

function statisticsUpdate() {
  backed.innerText = `$${formatNumber(DUMMY_DATA.totalBacked)}`;
  totalBackers.innerText = `${formatNumber(DUMMY_DATA.totalBackers)}`;
  daysLeft.innerText = `${formatNumber(DUMMY_DATA.daysLeft)}`;
  bar.style.width = `${progressBar(DUMMY_DATA.totalBacked)}%`;
}

function leftCountUpdate() {
  cardAbout.forEach((card) => {
    getLeftCount(card);
    countCheck(card);
  });

  cardSelections.forEach((card) => {
    if (!card.id) {
      return;
    }
    getLeftCount(card);
    countCheck(card);
  });
}

// statistics

statisticsUpdate();
leftCountUpdate();

btnsSelectReward.forEach((btn, ind) => {
  btn.addEventListener('click', () => {
    if (cardAbout[ind].classList.contains('disabled')) {
      return;
    }

    openModal();
    cardSelections.forEach((item) => {
      item.classList.remove('selected');
    });
    cardSelections[ind + 1].classList.add('selected');
  });
});

btnBack.addEventListener('click', () => {
  openModal();
});

btnCloseModal.addEventListener('click', () => {
  closeModal();
});

btnGotIt.addEventListener('click', () => {
  closeModal();
});

btnBookmark.addEventListener('click', () => {
  btnBookmark.classList.toggle('marked');
  if (btnBookmark.classList.contains('marked')) {
    btnBookmark.querySelector('span').innerText = 'Bookmarked';
  } else {
    btnBookmark.querySelector('span').innerText = 'Bookmark';
  }
});

btnBookmarkMob.addEventListener('click', () => {
  btnBookmarkMob.classList.toggle('marked');
});

headingSeections.forEach((heading, ind) => {
  heading.addEventListener('click', () => {
    if (cardSelections[ind].classList.contains('disabled')) {
      return;
    }
    cardSelections.forEach((item) => {
      item.classList.remove('selected');
      cardSelections[ind].classList.contains('selected');
    });
    cardSelections[ind].classList.add('selected');
  });
});

btnsContinue.forEach((btn, ind) => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();

    DUMMY_DATA.totalBacked += getEnteredPledge(btn);

    DUMMY_DATA.totalBackers += 1;

    const cardId = cardSelections[ind].id;

    DUMMY_DATA[`${cardId}Left`] -= 1;

    statisticsUpdate();
    leftCountUpdate();
    modalSelection.classList.remove('active');
    modalCompleted.classList.add('active');
  });
});

btnBurger.addEventListener('click', () => {
  burger.classList.toggle('opened');
  modal.classList.toggle('active');
  if (burger.classList.contains('opened')) {
    header.style.zIndex = '2';
  } else {
    header.style.zIndex = '0';
  }
});

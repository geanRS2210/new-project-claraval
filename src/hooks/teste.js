/* if (event.target.value.length > lengthDate) {
  if (lengthDate === 2) {
    const ped = event.target.value.slice(2, 3);
    const ini = event.target.value.slice(0, 2);
    event.target.value = `${ini}/${ped}`;
  }
  if (lengthDate === 5) {
    const ped = event.target.value.slice(5, 6);
    const ini = event.target.value.slice(0, 5);
    event.target.value = `${ini}/${ped}`;
  }
  if (event.target.value.length === 2) {
    event.target.value = `${event.target.value}/`;
  } else if (event.target.value.length === 5) {
    event.target.value = `${event.target.value}/`;
  } else if (event.target.value.length > 10) {
    const val = event.target.value;
    event.target.value = val.slice(0, 10);
    const num = event.target.value.split('/').join('');
    const num3 = num.slice(0, 2);
    const num4 = num.slice(2, 4);
    const num5 = num.slice(4, 8);
    event.target.value = `${num3}/${num4}/${num5}`;
  }
}
*/

/* const stringTest = event.target.value.match(/(\d+)/g);
console.log(stringTest);
Date = stringTest?.join('') || '';
if (Date.length > lengthDate) {
  if (Date.length === 2) {
    event.target.value = `${stringTest ? stringTest[0] : ''}/`;
  } else if (Date.length === 4) {
    event.target.value = `${stringTest ? stringTest[0] : ''}/${
      stringTest ? stringTest[1] : ''
    }/`;
  } else if (Date.length === 8) {
    event.target.value = `${stringTest ? stringTest[0] : ''}/${
      stringTest ? stringTest[1] : ''
    }/${stringTest ? stringTest[2] : ''}`;
  } else if (
    (Date.length > 0 && Date.length < 2) ||
    (Date.length > 2 && Date.length > 4) ||
    (Date.length > 4 && Date.length > 8)
  ) {
    const init = Date.slice(0, 2);
    const sequential = Date.slice(2, 4);
    const final = Date.slice(4, 8);
    event.target.value = `${stringTest ? stringTest[0] : ''}${
      `/${stringTest ? stringTest[1] : ''}` || ''
    }${`/${stringTest ? stringTest[2] : ''}` || ''}`;
  }
}
*/

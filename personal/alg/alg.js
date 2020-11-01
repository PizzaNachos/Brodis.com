

var canvas = document.getElementById("canvas");
var slider = document.getElementById("slider");
var ctx = canvas.getContext("2d");
ctx.fillStyle = "rgb(200,200,200)";
//ctx.fillStyle = "rgb(30,200,45)"
let block_width = 1;
var nums = [];
var comp = 0.0;
var swap = 0.0;

let numberOfNumbers = 50000;

setInterval(function () {
  numberOfNumbers = slider.value;
  document.getElementById("sliderNumber").innerHTML = numberOfNumbers;
}, 100);

slider.addEventListener("change", function () {
  changeArraySize(nums, numberOfNumbers);
});

fillArray();
scramble(nums);
printArray(nums);

function changeArraySize(nums, numberOfNumbers) {
  nums.length = numberOfNumbers;
  for (let i = 0; i < numberOfNumbers; i++) {
    nums[i] = i;
  }
  scramble(nums);
  printArray(nums);
  console.log(nums);
}
function fillArray() {
  for (let i = numberOfNumbers; i > 0; i--) {
    nums.push(i);
  }
  document.getElementById("sliderNumber").innerHTML = numberOfNumbers;
  console.log(nums);
}
function printArray(nums) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < nums.length; i = i + Math.round(numberOfNumbers / 1000)) {
    /* Colors? Complicated and doesn't look very good 
    ctx.fillStyle =
      "rgb(" +
      233 +
      ", " +
      233 +
      "," +
      33 +
      Math.round(numberOfNumbers / 500) +
      ")";
    */
    ctx.fillRect(
      block_width * (i / (numberOfNumbers / canvas.width)),
      canvas.height - nums[i] / (nums.length / canvas.height),
      block_width,
      nums[i] / (nums.length / canvas.height)
    );
  }
}
function printDetails(time, comp, swap, bigO) {
  printArray(nums);
  document.getElementById("time").innerHTML =
    "Miliseconds: " + Math.round(time);
  document.getElementById("comp").innerHTML = "Comparrisons: " + comp;
  document.getElementById("swap").innerHTML = "Array swaps: " + swap;
  document.getElementById("bigO").innerHTML = "BigO(" + bigO + ")";
}

function showBubbleDetails(){
  document.getElementById("sortingDetails").innerHTML =
  "<p1>What is Bubble Sort?<p1>" +
  "<div id='paragraph'>" +
  "Bubble sort is one of the slowest, most naive sorting algorithms that exists. " +
  "For every number/item in the array you check to see if the number in front of it is larger than it. " +
  "If it is you swap them, then you repeat the checking for every number in the array. " +
  "Then you pick another number from the array and do it all over again. " +
  "The run time of this algorithm is N^2 and is considered very slow and naive" +
  "</div>"
}
function bubbleSort(nums) {
  showBubbleDetails()
  comp = 0.0;
  swap = 0.0;
  var t0 = performance.now();
  for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < nums.length - i; j++) {
      if (++comp && nums[j] > nums[j + 1]) {
        ++swap;
        let tmp = nums[j];
        nums[j] = nums[j + 1];
        nums[j + 1] = tmp;
      }
    }
  }

  var t1 = performance.now();
  printDetails(t1 - t0, comp, swap, "n^2");
  console.log(nums);
}

function showMergeDetails(){
  document.getElementById("sortingDetails").innerHTML =
  "<p1>What is Merge Sort?<p1>" +
  "<div id='paragraph'>" +
  "Merge sort is a recursive, stable, sorting algorithm with a scaling run time of nlgn. " +
  "It breaks the array into two halves and 'merges' them successively. " +
  "The most difficult part of implementing this algorithm was the amount of 'off by one' " +
  "errors that are possible when dealing with this type of recursion." +
  "</div>"
}
function mergeSort(arr) {
  showMergeDetails()
  comp = 0.0;
  swap = 0.0;
  var t0 = performance.now();
  mergeSortRecursive(arr, 0, arr.length - 1, (a, b) => {
    if (a <= b) {
      return true;
    }
    return false;
  });
  var t1 = performance.now();
  printDetails(t1 - t0, comp, swap, "nlgn");
  console.log(nums);
}
function mergeSortRecursive(arr, start, end, compareFunction) {
  let middle = 0;
  if (start < end) {
    middle = Math.floor((start + end) / 2);
    mergeSortRecursive(arr, start, middle, compareFunction);
    mergeSortRecursive(arr, middle + 1, end, compareFunction);
    merge(arr, start, middle, end, compareFunction);
  } else {
    return;
  }
}
function merge(ar, start, middle, end, compareFunction1) {
  let auxStart = [];
  //let auxStart = nums.slice(start, middle);

  let auxEnd = [];
  //let auxEnd = nums.slice(middle, end);

  for (let i = start; i <= middle; i++) {
    auxStart.push(ar[i]);
  }
  for (let i = middle + 1; i <= end; i++) {
    auxEnd.push(ar[i]);
  }

  let mainIndex = start;
  let indexFirst = 0;
  let indexSecond = 0;

  while (indexFirst < middle - start + 1 && indexSecond < end - middle) {
    if (++comp && compareFunction1(auxStart[indexFirst], auxEnd[indexSecond])) {
      ar[mainIndex] = auxStart[indexFirst];
      indexFirst++;
    } else {
      ar[mainIndex] = auxEnd[indexSecond];
      indexSecond++;
    }
    mainIndex++;
    swap++;
  }
  while (indexFirst < middle - start + 1) {
    ar[mainIndex] = auxStart[indexFirst];
    mainIndex++;
    indexFirst++;
    swap++;
  }
  while (indexSecond < end - middle) {
    ar[mainIndex] = auxEnd[indexSecond];
    mainIndex++;
    indexSecond++;
    swap++;
  }
}

//39,211 WORKS on already sorted array
//39,220 BREAKS on already sorted array
function showQuicksortDetails(){
  document.getElementById("sortingDetails").innerHTML =
  "<p1>What is Quick Sort?<p1>" +
  "<div id='paragraph'>" +
  "Quick sort is a recursive, non-stable, in place, sorting algorithm with an average run time of nlgn. " +
  "It picks a random element to use as the pivot, and partitions all other elements around it. " +
  "Recursively performing this same action on each side of the partition we end up with a fully sorted array. " +
  "The most difficult aspect of implementing this algorithm was not indexing past the end of the array/Off by one errors." +
  "</div>"
}
function quickSort(nums) {
  showQuicksortDetails()
  comp = 0.0;
  swap = 0.0;
  var t0 = performance.now();
  quickSortRecursive(nums, 0, nums.length - 1);
  var t1 = performance.now();
  printDetails(t1 - t0, comp, swap, "nlgn");
  console.log(nums);
}
function quickSortRecursive(ar, start, end) {
  if (++comp && start < end) {
    middle = partition(ar, start, end);
    quickSortRecursive(ar, start, middle - 1);
    quickSortRecursive(ar, middle + 1, end);
  }
}
function partition(arr, start, end) {
  let pivot = arr[end];
  let index = start - 1;
  for (let i = start; i < end; i++) {
    if (++comp && arr[i] < pivot) {
      index++;

      let tmp = arr[index];
      arr[index] = arr[i];
      arr[i] = tmp;
      ++swap;
    }
  }

  let tmp = arr[index + 1];
  arr[index + 1] = arr[end];
  arr[end] = tmp;
  ++swap;
  // return pivot
  return index + 1;
}

function radixSort(arr) {
  comp = 0.0;
  swap = 0.0;
  var t0 = performance.now();
  let maxNumber = Math.max(...arr);
  let numDig = 0;
  for (let i = 1; i < maxNumber; i *= 10) {
    numDig++;
  }

  for (let i = 1; i < numDig; i++) {
    //sort by Math.floor((nums % (10 * i) / i))
  }
  var t1 = performance.now();
  printDetails(t1 - t0, comp, swap, "n");
  console.log(nums);
}

function showSystemDetails(){
  document.getElementById("sortingDetails").innerHTML =
  "<p1>What is this System Sort?<p1>" +
  "<div id='paragraph'>" +
  "Depending on your browser the system sort will do different things <ul>" +
  "<li>On chrome and all chromium based browsers (microsoft edge/opera) the javascript engine, which is written in C++, attempts to be clever " +
  "about the sorting algorithm that it uses, using quicksort for somethings, insertion sort for others, merge sort for yet others. </li>" +
  "<li>On Firefox the javascript engine (Spider Monkey), which is written in C, simply uses raw merge sort, and ends up being significantly faster than chromium based browsers " +
  "(if you have both you can test it now!) </li></ul>" +
  "</div>"
}
function systemSort(arr) {
  showSystemDetails()
  comp = 0.0;
  swap = 0.0;
  var t0 = performance.now();
  arr.sort((a, b) => a - b);
  var t1 = performance.now();
  printDetails(t1 - t0, "Unknown", "Unknown", "Unknown");
  console.log(nums);
}

function showScrambleDetails(){
  document.getElementById("sortingDetails").innerHTML =
  "<p1>How do you scramble an array?<p1>" +
  "<div id='paragraph'>" +
  "This particular scrambling algorithm simply iterates down the array and swaps a random element into the i'th position before moving onto the next element. " +
  "This scrambling algorithm is linear(scaling factor of N) but is dependent on the 'randomness' of the random function used. " +
  "</div>"
}
function scramble(arr) {
  showScrambleDetails()
  comp = 0.0;
  swap = 0.0;
  var t0 = performance.now();
  for (let i = 0; i < arr.length; i++) {
    let rand = Math.floor(Math.random() * arr.length);
    let tmp = arr[i];
    arr[i] = arr[rand];
    arr[rand] = tmp;
    swap++;
  }

  var t1 = performance.now();
  printDetails(t1 - t0, comp, swap, "n");
  console.log(nums);
}
function reverseSort(arr) {
  comp = 0.0;
  swap = 0.0;
  var t0 = performance.now();
  arr.sort((a, b) => b - a);
  var t1 = performance.now();
  printDetails(t1 - t0, "Unknown", "Unknown", "Unknown");
  console.log(nums);
}

window.onload = function() {
  tsParticles.loadJSON('particles-js', 'assets/particles.json').then(function(p) {
    // p is the loaded container, for using it later
    console.log('callback - particles.js config loaded');
  });
  tsParticles.load("tsparticles", {
    particles: {
      number: {
        value: 120,
        density: {
          enable: true,
          area: 800
        }
      },
      color: {
        value: ["rgb(0,0,0)"]
      },
      shape: {
        type: "circle",
        stroke: {
          width: 0,
          color: "#b6b2b2"
        }
      },
      size: {
        value: 2,
        random: false,
      },
      lineLinked: {
        enable: true,
        distance: 130,
        color: "rgb(0,0,0)",
        opacity: 1,
        width: 2,
      },
      move: {
        enable: true,
        speed: .64,
        direction: "none",
        random: true,
        straight: false,
        outMode: "bounce",
        bounce: false,
        attract: {
          enable: false,
          rotateX: 600,
          rotateY: 1200
        }
      }
    },
  });
};
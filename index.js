function shuffle(a) {
    var j, x, i;
    for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
}

function showRandomProTip(threads) {
    shuffle(threads);

    var ourThread;
    for (var i = 0; i < threads.length; i++) {
        ourThread = threads[i].data;

        if (ourThread.over_18 === false) {
            break;
        }
    }

    if (ourThread.title.length > 120) {
        document.getElementsByClassName("long_quote")[0].innerHTML = ourThread.title;
    } else {
        document.getElementsByClassName("quote")[0].innerHTML = ourThread.title;
    }

    document.getElementById("author").innerHTML = ourThread.author;
    document.getElementById("thread-link").href = ourThread.url;
}

function offline() {
    // Retrieve the object from storage
    var threads = localStorage.getItem('threads');
    threads = JSON.parse(threads);

    console.log(threads);

    showRandomProTip(threads);
}

var request = new XMLHttpRequest();
request.open('GET', 'https://www.reddit.com/r/shittylifeprotips.json?limit=100', true);

request.onload = function () {
    if (this.status >= 200 && this.status < 400) {
        // Success!
        var res = JSON.parse(this.response);
        var threads = res.data.children;

        // Save for later (offline) access
        localStorage.setItem('threads', JSON.stringify(threads));
        showRandomProTip(threads);

    } else {
        // We reached our target server, but it returned an error
        // WHAT TO DO HERE
        offline();
    }
};

request.onerror = function () {
    // There was a connection error of some sort
    offline();
};

request.send();


import axios from 'axios';

document.querySelector('#btnGetWithStatus').addEventListener('click', event => {
    oneStepWithStatus();
});

document.querySelector('#btnGetWithOutStatus').addEventListener('click', event => {
    oneStepWithoutStatus();
});

document.querySelector('#btnGetWith2StepLegacy').addEventListener('click', event => {
    twoStepByPromisePatternAnonymousFunction();
});

document.querySelector('#btnGetWith2StepPromise').addEventListener('click', event => {
    twoStepByPromisePattern();
});

document.querySelector('#btnGetWith2StepAsync').addEventListener('click', event => {
    twoStepAsyncAwait();
});

document.querySelector('#btnGetWith2StepAsyncAntiPattern').addEventListener('click', event => {
    twoStepAsyncAwaitAntiPattern();
});

function oneStepWithStatus() {
    const pipelineListDiv = document.querySelector('#pipelineListDiv');
    pipelineListDiv.innerHTML = '로딩중..';
    axios.get('http://localhost:8080/pipeline_list_with_status').then(res => {
        drawPipelineList(res.data)
    });
}

function oneStepWithoutStatus() {
    const pipelineListDiv = document.querySelector('#pipelineListDiv');
    pipelineListDiv.innerHTML = '로딩중..';
    axios.get('http://localhost:8080/pipeline_list_simple')
        .then(function (res) {
            drawPipelineList(res.data);
        }.bind(this));
}


function refreshStatus(datum, status) {
    datum.status = status;
    document.querySelector(`#${datum.name}`).innerHTML = getMessage(datum);
}
function twoStepByPromisePatternAnonymousFunction() {
    const pipelineListDiv = document.querySelector('#pipelineListDiv');
    pipelineListDiv.innerHTML = '로딩중..';

    axios.get('http://localhost:8080/pipeline_list_simple')
        .then(function (res) {
            res.data.map(datum => datum.status = '로딩중');
            drawPipelineList(res.data);
            return res.data;
        }.bind(this))
        .catch(function (err) {
            console.log('error :' + err)
        }.bind(this))
        .then(function (data) {
            data.forEach(datum => axios.get(`http://localhost:8080/pipelines/${datum.name}/status`)
                .then(function (res) {
                    refreshStatus(datum, res.data);
                }.bind(this)))
        }.bind(this))
        .catch(function (err) {
            console.log('error :' + err)
        }.bind(this));
}

function twoStepByPromisePattern() {
    const pipelineListDiv = document.querySelector('#pipelineListDiv');
    pipelineListDiv.innerHTML = '로딩중..';

    let promise = axios.get('http://localhost:8080/pipeline_list_simple')

    promise = promise.then(res => {
        res.data.map(datum => datum.status = '로딩중');
        drawPipelineList(res.data);
        return res.data;
    });

    promise = promise.then(data => {
        data.forEach(datum => axios.get(`http://localhost:8080/pipelines/${datum.name}/status`)
            .then(res => {
                refreshStatus(datum, res.data);
            }))
    });

    promise.catch(err => {
        alert('error :' + err)
    });
}

async function twoStepAsyncAwait() {
    const pipelineListDiv = document.querySelector('#pipelineListDiv');
    pipelineListDiv.innerHTML = '로딩중..';

    let list = (await axios.get('http://localhost:8080/pipeline_list_simple')).data;
    list.map(datum => datum.status = '로딩중');
    drawPipelineList(list);

    list.forEach(pipeline => updateStatus(pipeline));

    async function updateStatus(pipeline) {
        let status = (await axios.get(`http://localhost:8080/pipelines/${pipeline.name}/status`)).data;
        refreshStatus(pipeline, status);
    }
}

async function twoStepAsyncAwaitAntiPattern() {
    const pipelineListDiv = document.querySelector('#pipelineListDiv');
    pipelineListDiv.innerHTML = '로딩중..';

    let list = (await axios.get('http://localhost:8080/pipeline_list_simple')).data;
    list.map(datum => datum.status = '로딩중');
    drawPipelineList(list);

    for (const pipeline of list) {
        let status = (await axios.get(`http://localhost:8080/pipelines/${pipeline.name}/status`)).data;
        refreshStatus(pipeline, status);
    }
}

function getMessage(datum) {
    return `<h3> project: ${datum.projectId},  name: ${datum.name},    status:   ${datum.status} </h3>`;
}

function drawPipelineList(data) {
    const pipelineListDiv = document.querySelector('#pipelineListDiv');
    pipelineListDiv.innerHTML = '';
    for (let i = 0; i < data.length; i++) {
        const datum = data[i];
        console.log(datum);
        let message = getMessage(datum);
        let htmlDivElement = document.createElement('div');
        htmlDivElement.setAttribute("id", datum.name);
        htmlDivElement.innerHTML = message;
        pipelineListDiv.appendChild(htmlDivElement)
    }
}

document.querySelector('#clear').addEventListener('click', event => {
    const pipelineListDiv = document.querySelector('#pipelineListDiv');
    pipelineListDiv.innerHTML = '';
});

function component() {
    const element = document.createElement('div');
    return element;
}

document.body.appendChild(component());
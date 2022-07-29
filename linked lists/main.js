const colors = ["#5f33e1", "#ffe5a4", "#f778ba"];
const lis = document.getElementsByTagName("li");

const line12 = new LeaderLine(lis[0], lis[5], {
    hide: true,
    startPlug: "behind",
    endPlug: "behind" });

const line23 = new LeaderLine(lis[5], lis[10], {
    hide: true,
    startPlug: "behind",
    endPlug: "behind" });

const line34 = new LeaderLine(lis[5], lis[10], {
    hide: true,
    startPlug: "behind",
    endPlug: "behind" });


const getRandomIntInclusive = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
};

const handleLiOver = e => {
    let matchingNodes = [e.target];
    let linesMoved = [];
    const text = e.target.innerText;

    const nodes = Array.from(e.target.parentElement.children);
    const index = nodes.indexOf(e.target);
    const colorIndex = getRandomIntInclusive(0, colors.length - 1);

    // Add styles
    e.target.classList.add(`raise-${colorIndex + 1}`);

    for (let item of lis) {
    // Add styles to matching list items
        if (e.target !== item) {
            if (item.innerText === text) {
                matchingNodes.push(item);
                item.classList.add(`raise-${colorIndex + 1}`);
            }
        }
    }

    if (matchingNodes.length > 1) {
        for (let i = 0; i < matchingNodes.length - 1; i++) {
            for (let item of lis) {
                if (matchingNodes.includes(item) && matchingNodes[i] !== item) {
                    nodeOlId = parseInt(matchingNodes[i].parentElement.id);
                    itemOlId = parseInt(item.parentElement.id);

                    if (nodeOlId === 1 && itemOlId === 2) {
                        if (!linesMoved.includes(1)) {
                            line12.start = matchingNodes[i];
                            line12.end = item;
                            line12.color = colors[colorIndex];
                            line12.show();
                            linesMoved.push(1);
                        }
                    } else if (nodeOlId === 2 && itemOlId === 1) {
                        if (!linesMoved.includes(1)) {
                            line12.start = item;
                            line12.end = matchingNodes[i];
                            line12.color = colors[colorIndex];
                            line12.show();
                            linesMoved.push(1);
                        }
                    } else if (nodeOlId === 2 && itemOlId === 3) {
                        if (!linesMoved.includes(2)) {
                            line23.start = matchingNodes[i];
                            line23.end = item;
                            line23.color = colors[colorIndex];
                            line23.show();
                            linesMoved.push(2);
                        }
                    } else if (nodeOlId === 3 && itemOlId === 2) {
                        if (!linesMoved.includes(2)) {
                            line23.start = item;
                            line23.end = matchingNodes[i];
                            line23.color = colors[colorIndex];
                            line23.show();
                            linesMoved.push(2);
                        }
                    } else if (nodeOlId === 3 && itemOlId === 4) {
                        if (!linesMoved.includes(3)) {
                            line34.start = matchingNodes[i];
                            line34.end = item;
                            line34.color = colors[colorIndex];
                            line34.show();
                            linesMoved.push(3);
                        }
                    } else if (nodeOlId === 4 && itemOlId === 3) {
                        if (!linesMoved.includes(3)) {
                            line34.start = item;
                            line34.end = matchingNodes[i];
                            line34.color = colors[colorIndex];
                            line34.show();
                            linesMoved.push(3);
                        }
                    }
                }
            }
        }
    }
};

const handleLiOut = e => {
    // Remove styles from all
    for (let item of lis) {
        item.classList.remove("raise-1", "raise-2", "raise-3");
    }

    line12.hide();
    line23.hide();
    line34.hide();
};

for (let item of lis) {
    item.addEventListener("mouseover", handleLiOver);
    item.addEventListener("mouseout", handleLiOut);
}

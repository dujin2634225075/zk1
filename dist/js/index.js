"use strict";

var content = document.querySelector(".content");
axios.get("/api/getlist").then(function (res) {
    content.innerHTML = res.data.map(function (item) {
        return "<dl>\n                    <dt>\n                        <img src=\"" + item.src + "\" alt=\"\">\n                    </dt>\n                    <dd>\n                        <p>\n                            <img src=\"img/icon_04.gif\" alt=\"\">" + item.title + "\n                        </p>\n                    </dd>\n                </dl>";
    }).join("");
});
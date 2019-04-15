let content = document.querySelector(".content");
axios.get("/api/getlist").then((res) => {
    content.innerHTML = res.data.map(item => {
        return `<dl>
                    <dt>
                        <img src="${item.src}" alt="">
                    </dt>
                    <dd>
                        <p>
                            <img src="img/icon_04.gif" alt="">${item.title}
                        </p>
                    </dd>
                </dl>`
    }).join("")
})
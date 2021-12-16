import React from 'react'

type DarkmodeProps = {

}

const Darkmode: React.FC<DarkmodeProps> = () => {

    React.useEffect(() => {
        if(localStorage.getItem("theme") === null) localStorage.setItem("theme", "light");
    })

    let clickedClass = "clicked";
    const body = document.body;
    const lightTheme = "light";
    const darkTheme = "dark";
    let theme: any;

    if (localStorage) {
        theme = localStorage.getItem("theme");
    }

    if (theme === lightTheme || theme === darkTheme) {
        body.classList.add(theme);
    } else {
        body.classList.add(lightTheme);
    }

    const switchTheme = (e: any) => {
        const themetxt = (document.getElementById("darkMode") as HTMLParagraphElement);

        if (theme === darkTheme) {
            body.classList.replace(darkTheme, lightTheme);
            e.target.classList.remove(clickedClass);
            localStorage.setItem("theme", "light");
            theme = lightTheme;
            themetxt.innerHTML = "Dark Mode"
        } else {
            body.classList.replace(lightTheme, darkTheme);
            e.target.classList.add(clickedClass);
            localStorage.setItem("theme", "dark");
            theme = darkTheme;
            themetxt.innerHTML = "Light Mode"
        }
    };

  return (
    <div className="text-center">
        <button
        className={theme === "dark" ? clickedClass : ""}
        id="darkMode"
        onClick={ (e) => switchTheme(e) }
        >
            <p id="txt">{ theme === darkTheme ? "Light Mode" : "Dark Mode" }</p>
        </button>
    </div>
  )
}

export default Darkmode
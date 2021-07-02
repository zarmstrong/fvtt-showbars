//Adds menu option to Scene Nav and Directory
Hooks.on("getActorDirectoryFolderContext", (html, contextOptions) => {

    console.log("showbars")
    console.log(contextOptions)
    console.log(html)
    // contextOptions.push(showHealthBar('sceneId'));
});

//Credit to Winks' Everybody Look Here for the code to add menu option to Scene Nav
function showHealthBar(idField) {
    return {
        name: "Show Healthbars",
        icon: '<i class="fas fa-plus-square"></i>',
        condition: li => game.user.isGM,
        callback: li => {
            console.log(li.data)
            // let scene = game.scenes.get(li.data(idField));      
            // resetDoorsAndFog(scene)
        }
    };
}
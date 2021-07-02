const showbarsVersion="0.1.0";
var showshowpc=true;
var showhidepc=true;
var showshownpc=true;
var showhidenpc=true;
var showshownamepc=true;
var showhidenamepc=true;

//will have to revisit this:
// Hooks.on('ready', async function() {
//     game.settings.register('showbars', 'showshowpc', {
//         name : "Show the 'Show PC Healthbars' button",
//         hint : "",
//         scope : 'world',
//         config : true,
//         type : Boolean,
//         default : true,
//         onChange: value => (location.reload())
//     });
//     game.settings.register('showbars', 'showhidepc', {
//         name : "Show the 'Hide PC Healthbars' button",
//         hint : "",
//         scope : 'world',
//         config : true,
//         type: Boolean,
//         default: true,
//         onChange: value => (location.reload())
//     });
//     game.settings.register('showbars', 'showshownamepc', {
//         name : "Show the 'Show PC Names' button",
//         hint : "",
//         scope : 'world',
//         config : true,
//         type : Boolean,
//         default : true,
//         onChange: value => (location.reload())
//     });
//     game.settings.register('showbars', 'showhidenamepc', {
//         name : "Show the 'Hide PC Names' button",
//         hint : "",
//         scope : 'world',
//         config : true,
//         type: Boolean,
//         default: true,
//         onChange: value => (location.reload())
//     });
//     game.settings.register('showbars', 'showshownpc', {
//         name : "Show the 'Show NPC Healthbars' button",
//         hint : "",
//         scope : 'world',
//         config : true,
//         type : Boolean,
//         default : true,
//         onChange: value => (location.reload())
//     });
//     game.settings.register('showbars', 'showhidenpc', {
//         name : "Show the 'Hide NPC Healthbars' button",
//         hint : "",
//         scope : 'world',
//         config : true,
//         type: Boolean,
//         default: true,
//         onChange: value => (location.reload())
//     });
//     showshowpc=game.settings.get('showbars', 'showshowpc');
//     showhidepc=game.settings.get('showbars', 'showhidepc');
//     showshownpc=game.settings.get('showbars', 'showshownpc');
//     showhidenpc=game.settings.get('showbars', 'showhidenpc');
//     showshownamepc=game.settings.get('showbars', 'showshownamepc');
//     showhidenamepc=game.settings.get('showbars', 'showhidenamepc');
// });

Hooks.on("getActorDirectoryFolderContext", (html, contextOptions) => {
    addMenuOptions(contextOptions);
});

function addMenuOptions(contextOptions) {
    console.log("showbars showshowpc:"+showshowpc)
    if (showshowpc) {
        contextOptions.push(
            {
                name: "Show PC Healthbars",
                icon: '<i class="fas fa-heart"></i>',
                condition: li => game.user.isGM,
                callback: li =>  showPCHealthBar(li)
            });
    }
    if (showhidepc){
        contextOptions.push({
                name: "Hide PC Healthbars",
                icon: '<i class="far fa-heart"></i>',
                condition: li => game.user.isGM,
                callback: li => hidePCHealthBar(li)
            });
    }
    if (showshownpc){
        contextOptions.push({
                name: "Show NPC Healthbars",
                icon: '<i class="fas fa-plus-square"></i>',
                condition: li => game.user.isGM,
                callback: li => showNPCHealthBar(li)
            });
    }
    if (showhidenpc){
        contextOptions.push({
                name: "Hide NPC Healthbars",
                icon: '<i class="far fa-minus-square"></i>',
                condition: li => game.user.isGM,
                callback: li => showPCTokenName(li)
            });
    }
    if (showshownamepc){
        contextOptions.push({
                name: "Show PC Names",
                icon: '<i class="fas fa-eye"></i>',
                condition: li => game.user.isGM,
                callback: li => showPCTokenName(li)
            });
    }
    if (showhidenamepc){
        contextOptions.push({
                name: "Hide PC Names",
                icon: '<i class="fas fa-eye-slash"></i>',
                condition: li => game.user.isGM,
                callback: li => hidePCTokenName(li)
            });
    }
}

async function showPCHealthBar(li) {
    let folderId = li.parent().attr("data-folder-id");
    let folder = game.folders.get(folderId);
    let entities = folder.content;
    if (entities.length > 0) {
        console.log(entities);
        const updates = game.actors.filter(a => a.data.type === "character").filter(a => a.data.folder === folderId ).map(a => ({
                _id: a.id,
                "token.bar1.attribute": "attributes.hp",
                'token.displayBars': 50
            }));
        console.log(updates);
        let updatedActors = await Actor.update(updates,{diff:true});
        ui.notifications.info("All PCs in the selected folder now have visible Healthbars.");
        ui.notifications.warn("You must recreate tokens on a scene for the healthbars to render.");
    }
}
async function hidePCHealthBar(li) {
    let folderId = li.parent().attr("data-folder-id");
    let folder = game.folders.get(folderId);
    let entities = folder.content;
    if (entities.length > 0) {
        console.log(entities);
        const updates = game.actors.filter(a => a.data.type === "character").filter(a => a.data.folder === folderId ).map(a => ({
                _id: a.id,
                "token.bar1.attribute": "attributes.hp",
                'token.displayBars': 20
            }));
        console.log(updates);
        let updatedActors = await Actor.update(updates,{diff:true});
        ui.notifications.info("All PCs in the selected folder now have hidden Healthbars.");
        ui.notifications.warn("You must recreate tokens on a scene for any existing healthbars to disappear.");
    }
}
async function showNPCHealthBar(li) {
    let folderId = li.parent().attr("data-folder-id");
    let folder = game.folders.get(folderId);
    let entities = folder.content;
    if (entities.length > 0) {
        console.log(entities);
        const updates = game.actors.filter(a => a.data.type === "npc").filter(a => a.data.folder === folderId ).map(a => ({
                _id: a.id,
                "token.bar1.attribute": "attributes.hp",
                'token.displayBars': 50
            }));
        console.log(updates);
        let updatedActors = await Actor.update(updates,{diff:true});
        ui.notifications.info("All NPCs in the selected folder now have visible Healthbars.");
        ui.notifications.warn("You must recreate tokens on a scene for the healthbars to render.");
    }
}
async function hideNPCHealthBar(li) {
    let folderId = li.parent().attr("data-folder-id");
    let folder = game.folders.get(folderId);
    let entities = folder.content;
    if (entities.length > 0) {
        console.log(entities);
        const updates = game.actors.filter(a => a.data.type === "npc").filter(a => a.data.folder === folderId ).map(a => ({
                _id: a.id,
                "token.bar1.attribute": "attributes.hp",
                'token.displayBars': 20
            }));
        console.log(updates);
        let updatedActors = await Actor.update(updates,{diff:true});
        ui.notifications.info("All NPCs in the selected folder now have hidden Healthbars.");
        ui.notifications.warn("You must recreate tokens on a scene for any existing healthbars to disappear.");
    }
}

async function showPCTokenName(li) {
    let folderId = li.parent().attr("data-folder-id");
    let folder = game.folders.get(folderId);
    let entities = folder.content;
    if (entities.length > 0) {
        console.log(entities);
        const updates = game.actors.filter(a => a.data.type === "character").filter(a => a.data.folder === folderId ).map(a => ({
                _id: a.id,
                'token.displayName': 50
            }));
        console.log(updates);
        let updatedActors = await Actor.update(updates,{diff:true});
        ui.notifications.info("All PCs in the selected folder now have visible names.");
        ui.notifications.warn("You must recreate tokens on a scene for the names to render.");
    }
}

async function hidePCTokenName(li) {
    let folderId = li.parent().attr("data-folder-id");
    let folder = game.folders.get(folderId);
    let entities = folder.content;
    if (entities.length > 0) {
        console.log(entities);
        const updates = game.actors.filter(a => a.data.type === "character").filter(a => a.data.folder === folderId ).map(a => ({
                _id: a.id,
                'token.displayName': 20
            }));
        console.log(updates);
        let updatedActors = await Actor.update(updates,{diff:true});
        ui.notifications.info("All PCs in the selected folder now have hidden names.");
        ui.notifications.warn("You must recreate tokens on a scene for the names to render.");
    }
}
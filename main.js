const { app,BrowserWindow,globalShortcut,ipcMain,clipboard } = require('electron')
var win;var codes;var havij_i = 0;
const createWindow = () => 
{

  win = new BrowserWindow
  ({
    width: 800,
    height: 800,
	icon: "images/i.png",
	webPreferences: {nodeIntegration: true,contextIsolation: false,},
	autoHideMenuBar: true,
  })


ipcMain.on('hi', function(e,data){codes = data;havij_i = 0;clipboard.writeText(codes[havij_i++]);});
ipcMain.on('bye', function(e,data){codes = [];havij_i = 0;clipboard.writeText("");});
win.loadFile('index.html');

}


app.whenReady().then(() => 
{

createWindow();

	const ret = globalShortcut.register('CommandOrControl+B', () => 
	{
		if(codes[havij_i]) 
		{
			clipboard.writeText(codes[havij_i]);
			if(codes[havij_i+1]) havij_i++;
			win.webContents.send('move_forward', 'Hola');
		}

		else clipboard.writeText("");
	});


});





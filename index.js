import * as PIXI from 'pixi.js';

const app = new PIXI.Application({ width: 1080, height: 720, backgroundColor: 0xeeeeee });
app.stage.eventMode = 'static';
app.stage.hitArea = app.screen;
document.body.appendChild(app.view);


const rectangle = new PIXI.Graphics();
rectangle.beginFill(0xff0000);
rectangle.drawRect(0, 0, 200, 500);
rectangle.endFill();
rectangle.eventMode = 'static';
rectangle.position.set(500, 300);
rectangle.pivot.set(rectangle.width / 2, rectangle.height / 2);
app.stage.addChild(rectangle);

const rotateHandle = new PIXI.Graphics();
rotateHandle.beginFill(0x0000ff);
rotateHandle.drawRect(0, 0, 10, 60);
rotateHandle.drawCircle(5, 0, 20);
rotateHandle.endFill();
rotateHandle.position.set(rectangle.width / 2 - 5, -60);
rotateHandle.eventMode = 'static';
rectangle.addChild(rotateHandle);

const resizeHandle = new PIXI.Graphics();
resizeHandle.beginFill(0x00ff00);
resizeHandle.drawCircle(0, 0, 10);
resizeHandle.endFill();
resizeHandle.position.set(rectangle.width, rectangle.height - 60);
resizeHandle.eventMode = 'static';
rectangle.addChild(resizeHandle);


let dragItem = {
    target: null,
    onPointerMove: null,
};

app.stage.on('pointerup', event => { 
    if(dragItem.target) {
        app.stage.off('pointermove', dragItem.onPointerMove);
        dragItem.target = null;
        dragItem.onPointerMove = null;
    }
});


const onPointerMove = (event) => {
    dragItem.target.position.x = event.screen.x - dragItem.target.originX;
    dragItem.target.position.y = event.screen.y - dragItem.target.originY;
}

rectangle.on('pointerdown', event => {
    rectangle.originX = event.screen.x - event.target.x;
    rectangle.originY = event.screen.y - event.target.y;

    dragItem.target = event.target;
    dragItem.onPointerMove = onPointerMove;
    app.stage.on('pointermove', onPointerMove);
});


const onMouseMoveRotateHandle = (event) => {
    const angle = Math.atan2(event.screen.y - rectangle.y, event.screen.x - rectangle.x);
    rectangle.rotation = angle;
}

rotateHandle.on('pointerdown', event => {
    event.stopPropagation();

    dragItem.target = event.target;
    dragItem.onPointerMove = onMouseMoveRotateHandle;
    app.stage.on('pointermove', onMouseMoveRotateHandle);
});



const onResize = event => {
    const localTopLeftX = rectangle.x - rectangle.width / 2;
    const localTopLeftY = rectangle.y - rectangle.height / 2;

    rectangle.width = event.screen.x - localTopLeftX;
    rectangle.height = event.screen.y - localTopLeftY;

    rectangle.x = localTopLeftX + rectangle.width / 2;
    rectangle.y = localTopLeftY + rectangle.height / 2;
}

resizeHandle.on('pointerdown', event => {
    event.stopPropagation();

    dragItem.target = event.target;
    dragItem.onPointerMove = onResize;
    app.stage.on('pointermove', onResize);
});

















app.ticker.add(() => {
    // rectangle.rotation += 0.01;
});
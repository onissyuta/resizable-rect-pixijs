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


let dragItem = {
    target: null,
    onPointerMove: null,
};

const onPointerMove = (event) => {
    rectangle.x = event.screen.x - dragItem.target.originX;
    rectangle.y = event.screen.y - dragItem.target.originY;
}

rectangle.on('pointerdown', event => {
    rectangle.originX = event.screen.x - event.target.x;
    rectangle.originY = event.screen.y - event.target.y;

    app.stage.on('pointermove', onPointerMove);
    dragItem.target = event.target;
    dragItem.onPointerMove = onPointerMove;
});


app.stage.on('pointerup', event => { 
    if(dragItem.target) {
        app.stage.off('pointermove', dragItem.onPointerMove);
        dragItem.target = null;
        dragItem.onPointerMove = null;
    }
});




app.ticker.add(() => {
    // rectangle.rotation += 0.01;
});
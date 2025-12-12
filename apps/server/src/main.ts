import express, { json } from 'express';
import cors from 'cors';
import { initializeMediasoupServer } from './mediasoup-service';
import { addMediasoupRoutes } from './routes/mediasoup';

const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();
app.use(json());
app.use(cors());

app.get('/', (_, res) => {
    res.send({ message: 'Hello from express' });
});

addMediasoupRoutes(app);

initializeMediasoupServer().then(() =>
    console.log('Mediasoup server initialized')
);

app.listen(port, () => {
    console.log(`Now listening on port: ${port}`);
});

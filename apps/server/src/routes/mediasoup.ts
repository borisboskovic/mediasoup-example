import { Express, Request } from 'express';
import { store } from '../store';
import {
    connectTransport,
    consume,
    createTransport,
    produce,
} from '../mediasoup-service';
import {
    ConnectTransportData,
    ConsumeData,
    ProduceData,
} from '@mediasoup-example/shared/types';

export const addMediasoupRoutes = (app: Express) => {
    app.get('/router-capabilities', (_, res) => {
        const router = store.getRouter();
        return res.status(200).json(router?.rtpCapabilities);
    });

    app.post('/create-transport', async (_, res) => {
        try {
            const transport = await createTransport();
            return res.status(201).json(transport);
        } catch (error) {
            return res.status(500).send(error);
        }
    });

    app.post(
        '/connect-transport',
        async (req: Request<unknown, unknown, ConnectTransportData>, res) => {
            try {
                await connectTransport(req.body);
                return res.sendStatus(200);
            } catch (error) {
                return res.status(400).send(error);
            }
        }
    );

    app.post(
        '/produce',
        async (req: Request<unknown, unknown, ProduceData>, res) => {
            try {
                const response = await produce(req.body);
                return res.status(200).json(response);
            } catch (error) {
                return res.status(400).send(error);
            }
        }
    );

    app.post(
        '/consume',
        async (req: Request<unknown, unknown, ConsumeData>, res) => {
            try {
                const response = await consume(req.body);
                return res.status(200).json(response);
            } catch (error) {
                return res.status(400).send(error);
            }
        }
    );
};

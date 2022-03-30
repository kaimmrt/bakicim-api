const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const config = require('./config');

const { AuthRoutes, WorkTypePriceRoutes, FavoriteRoutes, OfferRoutes, AboutMeRoutes } = require('./routes')
const verifyToken = require('./middleware/verify-token')

config();

const db = require('./helper/db');
const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors());

async function bootServer() {
    try {
        await db.sequelize.sync();

        app.listen(process.env.APP_PORT, () => {
            console.log(`Listening on: http//localhost:${process.env.APP_PORT}`);
            app.use('/', AuthRoutes);
            app.use('/api', verifyToken);
            app.use('/api/me', AboutMeRoutes);
            app.use('/api/work_type_price', WorkTypePriceRoutes);
            app.use('/api/favorite', FavoriteRoutes);
            app.use('/api/offer', OfferRoutes);
        });
    } catch (err) {
        console.error(err);
    }
}

bootServer();
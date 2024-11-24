import React from 'react';
import { Link } from 'react-router-dom';

const AdminLink = (props) => {
    const { activeClass } = props;
    return (
        <>
            <Link
                to={ `/sirb/dashboard` }
                className={ activeClass == "dashboard" ? "active" : "" }
            >
                <i className="fas fa-home"></i><span>{ " " }Dashboard</span>
            </Link>
            <Link
                to={ `/sirb/profile` }
                className={ activeClass == "profile" ? "active" : "" }
            >
                <i className="fas fa-user"></i><span>{ " " }Profile</span>
            </Link>
            <Link
                to={ `/sirb/messenger` }
                className={ activeClass == "messenger" ? "active" : "" }
            >
                <i className="fas fa-comments"></i><span>{ " " }Messenger</span>
            </Link>
            <Link
                to={ `/sirb/users` }
                className={ activeClass == "users" ? "active" : "" }
            >
                <i className="fas fa-user-friends"></i><span>{ " " }Users</span>
            </Link>
            <Link
                to={ `/sirb/blog_posts` }
                className={ activeClass == "blog_posts" ? "active" : "" }
            >
                <i className="fas fa-blog"></i><span>{ " " }Blog posts</span>
            </Link>
            <Link
                to={ `/sirb/predictions` }
                className={ activeClass == "predictions" ? "active" : "" }
            >
                <i className="fas fa-futbol"></i><span>{ " " }Predictions</span>
            </Link>
            <Link
                to={ `/sirb/clubs` }
                className={ activeClass == "clubs" ? "active" : "" }
            >
                <i className="fas fa-users"></i><span>{ " " }Clubs</span>
            </Link>
            <Link
                to={ `/sirb/picks` }
                className={ activeClass == "picks" ? "active" : "" }
            >
                <i className="fas fa-futbol"></i><span>{ " " }Picks</span>
            </Link>
            <Link
                to={ `/sirb/products` }
                className={ activeClass == "products" ? "active" : "" }
            >
                <i className="fas fa-store"></i><span>{ " " }Products</span>
            </Link>
            <Link
                to={ `/sirb/tips` }
                className={ activeClass == "tips" ? "active" : "" }
            >
                <i className="fas fa-thumbs-up"></i><span>{ " " }Tips</span>
            </Link>
            <Link
                to={ `/sirb/events` }
                className={ activeClass == "events" ? "active" : "" }
            >
                <i className="fas fa-fire"></i><span>{ " " }Events</span>
            </Link>
            <Link
                to={ `/sirb/ads_manager` }
                className={ activeClass == "ads_manager" ? "active" : "" }
            >
                <i className="fas fa-ad"></i><span>{ " " }Ads manager</span>
            </Link>
            <Link
                to={ `/sirb/settings` }
                className={ activeClass == "settings" ? "active" : "" }
            >
                <i className="fas fa-cogs"></i><span>{ " " }Settings</span>
            </Link>

        </>
    );
};

export default AdminLink;

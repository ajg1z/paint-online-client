import classNames from 'classnames';
import type { PropsWithChildren } from 'react';
import { UserRoom } from '../Room.types';
import cls from './Sidebar.module.scss';

interface SidebarProps {
    className?: string;
    members: UserRoom[];
}

export const Sidebar = (props: PropsWithChildren<SidebarProps>) => {
    const { className, members } = props;

    return (
        <div className={classNames(cls.Sidebar, className)}>
            <h2>Connected members</h2>
            {members?.map((member) => (
                <div key={member._id} className={cls.member}>
                    <span>{member.name}</span>
                </div>
            ))}
        </div>
    );
};

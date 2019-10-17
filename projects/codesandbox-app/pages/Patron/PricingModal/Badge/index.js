import React, { memo } from 'react';
import Relative from '@csb/common/lib/components/Relative';
import badges from '@csb/common/lib/utils/badges/patron-info';
import './animations.css';
import { Particles } from './Particles';
import { BadgeContainer } from './elements';
export const Badge = memo(({ badge, subscribed }) => {
    const BadgeComponent = badges[badge].Badge;
    return (<Relative>

      <Particles makeItRain={subscribed} badge={badge}/>
      <BadgeContainer key={badge} id="badge">
        <img style={{ height: '100%' }} src={BadgeComponent} className={`badge ${badge}`} alt={badge}/>
      </BadgeContainer>
    </Relative>);
});

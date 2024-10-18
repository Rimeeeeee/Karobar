import React, { useEffect, useState } from 'react';
import { getAvatar, getName } from '@coinbase/onchainkit/identity';
import { base } from 'viem/chains';
import { useActiveAccount } from 'thirdweb/react';

const basename = 'karobar.basetest.eth';

const Abc = () => {
    const address = useActiveAccount()?.address; // Get the active account's address
    console.log(address);
    const [avatar, setAvatar] = useState(null);
    const [name, setName] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            if (!address) {
                
                setLoading(false);
                return;
            }

            try {
                const fetchedAvatar = await getAvatar({ ensName: basename, chain: base });
                const fetchedName = await getName({ address, chain: base });
                setAvatar(fetchedAvatar);
                setName(fetchedName);
            } catch (err) {
               
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [address]); // Refetch data when the address changes

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="flex items-center">
            {avatar && <img src={avatar} alt={`${name || basename}'s avatar`} className="rounded-full w-12 h-12 mr-2" />}
            <span className="bg-emerald-400 px-2 py-1 rounded">{name || basename}</span>
        </div>
    );
};

export default Abc;

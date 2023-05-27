import { useEffect, useState } from 'react';
import { Unit } from '~/types';
import UnitApi from '~/api/UnitApi';

function useFetchUnit() {
  const [loading, setLoading] = useState(false);
  const [selling_unit, setSellingUnit] = useState<Unit[]>([]);
  const [expiry_unit, setExpiryUnit] = useState<Unit[]>([]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const selling_unit = await UnitApi.getUnitsByType('selling');
        const expiry_unit = await UnitApi.getUnitsByType('expiry');
        setSellingUnit(selling_unit.data);
        setExpiryUnit(expiry_unit.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return {
    loading,
    selling_unit,
    expiry_unit,
  };
}

export default useFetchUnit;

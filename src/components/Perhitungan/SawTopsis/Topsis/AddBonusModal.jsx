import { Modal, Button, Label, Radio } from "flowbite-react";
import { useState, useEffect } from "react";

export default function AddBonusModal({
  isOpen,
  onClose,
  alternatifName,
  onApplyBonus,
  selectedAlternatif,
  currentBonus,
}) {
  const [bantuanSebelumnya, setBantuanSebelumnya] = useState("");
  const [kepalaKeluargaLansia, setKepalaKeluargaLansia] = useState("");
  const [kepemilikanTanah, setKepemilikanTanah] = useState("");

  // Load current bonus criteria when modal opens
  useEffect(() => {
    if (isOpen && currentBonus && currentBonus.criteria) {
      setBantuanSebelumnya(currentBonus.criteria.bantuanSebelumnya || "");
      setKepalaKeluargaLansia(currentBonus.criteria.kepalaKeluargaLansia || "");
      setKepemilikanTanah(currentBonus.criteria.kepemilikanTanah || "");
    } else if (isOpen) {
      // Reset form when no current bonus
      setBantuanSebelumnya("");
      setKepalaKeluargaLansia("");
      setKepemilikanTanah("");
    }
  }, [isOpen, currentBonus]);

  const handleSave = () => {
    const bonusData = {
      bantuanSebelumnya,
      kepalaKeluargaLansia,
      kepemilikanTanah,
    };

    // Apply bonus to the alternatif's score
    if (onApplyBonus && selectedAlternatif) {
      onApplyBonus(selectedAlternatif.alternatifId, bonusData);
    }

    onClose();
  };

  const handleClose = () => {
    onClose();
  };

  // Calculate current bonus score for display
  const calculateCurrentBonus = () => {
    let bonus = 0;
    if (bantuanSebelumnya === "belum") bonus += 0.01;
    if (kepalaKeluargaLansia === "ya") bonus += 0.01;
    if (kepemilikanTanah === "tanah pribadi") bonus += 0.01;
    return Math.min(bonus, 0.03);
  };

  const currentBonusScore = calculateCurrentBonus();
  const isMaxBonus = currentBonusScore >= 0.03;

  return (
    <Modal
      show={isOpen}
      onClose={handleClose}
    >
      <Modal.Header>
        Add Bonus for {alternatifName}
        {currentBonus && currentBonus.score > 0 && (
          <span className="ml-2 text-sm text-blue-600">(Current: +{currentBonus.score.toFixed(3)})</span>
        )}
      </Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          {/* Show current bonus calculation */}
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-sm font-medium text-gray-700">
              Bonus yang akan diterapkan: +{currentBonusScore.toFixed(3)}
              {isMaxBonus && <span className="ml-2 text-red-600 text-xs">(Maksimal tercapai)</span>}
            </p>
          </div>

          {/* Bantuan Sebelumnya */}
          <div>
            <Label className="text-base font-medium text-gray-900 mb-3 block">
              {alternatifName} sudah pernah mendapat bantuan sebelumnya
            </Label>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Radio
                  id="sudah"
                  name="bantuan"
                  value="sudah"
                  checked={bantuanSebelumnya === "sudah"}
                  onChange={(e) => setBantuanSebelumnya(e.target.value)}
                />
                <Label htmlFor="sudah">Sudah</Label>
              </div>
              <div className="flex items-center gap-2">
                <Radio
                  id="belum"
                  name="bantuan"
                  value="belum"
                  checked={bantuanSebelumnya === "belum"}
                  onChange={(e) => setBantuanSebelumnya(e.target.value)}
                />
                <Label htmlFor="belum">Belum (+0.01)</Label>
              </div>
            </div>
          </div>

          {/* Kepala Keluarga Lansia */}
          <div>
            <Label className="text-base font-medium text-gray-900 mb-3 block">
              {alternatifName} merupakan kepala keluarga lansia
            </Label>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Radio
                  id="ya"
                  name="lansia"
                  value="ya"
                  checked={kepalaKeluargaLansia === "ya"}
                  onChange={(e) => setKepalaKeluargaLansia(e.target.value)}
                />
                <Label htmlFor="ya">Ya (+0.01)</Label>
              </div>
              <div className="flex items-center gap-2">
                <Radio
                  id="tidak"
                  name="lansia"
                  value="tidak"
                  checked={kepalaKeluargaLansia === "tidak"}
                  onChange={(e) => setKepalaKeluargaLansia(e.target.value)}
                />
                <Label htmlFor="tidak">Tidak</Label>
              </div>
            </div>
          </div>

          {/* Kepemilikan Tanah */}
          <div>
            <Label className="text-base font-medium text-gray-900 mb-3 block">Kepemilikan tanah</Label>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Radio
                  id="tanah-keluarga"
                  name="tanah"
                  value="tanah milik keluarga"
                  checked={kepemilikanTanah === "tanah milik keluarga"}
                  onChange={(e) => setKepemilikanTanah(e.target.value)}
                />
                <Label htmlFor="tanah-keluarga">Tanah milik keluarga</Label>
              </div>
              <div className="flex items-center gap-2">
                <Radio
                  id="tanah-pribadi"
                  name="tanah"
                  value="tanah pribadi"
                  checked={kepemilikanTanah === "tanah pribadi"}
                  onChange={(e) => setKepemilikanTanah(e.target.value)}
                />
                <Label htmlFor="tanah-pribadi">Tanah pribadi (+0.01)</Label>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={handleSave}
          className="bg-green-500 hover:bg-green-700"
        >
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

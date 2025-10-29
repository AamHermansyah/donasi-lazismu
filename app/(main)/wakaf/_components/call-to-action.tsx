import { Button } from "@/components/ui/button";
import React from "react";

function CallToAction() {
  return (
    <section className="bg-gradient-to-tr from-secondary to-orange-300 text-secondary-foreground py-16 mb-10">
      <div className="container mx-auto sm:text-center">
        <h2 className="text-3xl sm:text-5xl font-bold mb-4 max-w-2xl mx-auto">
          Mari <i>Berbagi</i> dan Wujudkan <i>Kebaikan</i> Bersama
        </h2>
        <p className="sm:text-lg lg:text-xl mb-8 max-w-6xl mx-auto">
          &ldquo;<b>Bergabunglah</b> dalam gerakan kebaikan bersama LAZISMU
          Kabupaten Tasikmalaya. Setiap donasi, zakat, dan infak yang Anda
          titipkan menjadi bagian dari <b>perubahan nyata </b>
          bagi pendidikan, ekonomi umat, dan kemanusiaan.&rdquo;
        </p>
        <div className="sm:flex sm:justify-center space-x-4">
          <Button variant="primary" className="font-semibold">
            Bergabung Sekarang
          </Button>
        </div>
      </div>
    </section>
  );
}

export default CallToAction;
